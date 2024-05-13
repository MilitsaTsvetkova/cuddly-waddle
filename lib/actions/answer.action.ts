"use server";

import { revalidatePath } from "next/cache";
import Answer from "../../database/answer.model";
import Question from "../../database/question.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { question, content, author, path } = params;
    const answer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    // TODO: add interaction

    revalidatePath(path);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({
        createdAt: -1,
      });

    return { answers };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
