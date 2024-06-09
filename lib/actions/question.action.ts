"use server";

import { Error, FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Answer from "../../database/answer.model";
import Interaction from "../../database/interaction.model";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
  RecommendedParams,
} from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user
    await Interaction.create({
      user: author,
      question: question._id,
      action: "ask_question",
      tags: tagDocuments,
    });
    // update ranking

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    // calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }
    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);
    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;
    return { questions, isNext };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return { question };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    // update user's reputation for upvoting/revoking an upvote to the question

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 },
    });

    // increment retupation by 10/-10 for receiving an upvote/downvote to the question

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function downVoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    // update user's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 },
    });
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, title, content } = params;
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    question.title = title;
    question.content = content;
    await question.save();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getHotQuestions() {
  try {
    await connectToDatabase();
    // soring in descending order
    const hotQuestions = await Question.find({}).sort({
      views: -1,
      upvotes: -1,
    });
    return { hotQuestions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getRecomendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const skipAmount = pageSize * (page - 1);

    // find user's interactions

    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // extract tags from user's interaction

    const userTags = userInteractions.reduce((acc, interaction) => {
      if (interaction.tags) {
        acc = acc.concat(interaction.tags);
      }
      return acc;
    }, []);

    // get distinct tag ids

    const tagIds = [...new Set(userTags.map((tag: any) => tag._id))];

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: tagIds } }, // questions with user's tags
        { author: { $ne: user._id } },
      ], // exclude user's own questions
    };

    const totalQuestions = await Question.countDocuments(query);

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length;
    return { questions: recommendedQuestions, isNext };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
