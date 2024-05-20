"use server";

import { FilterQuery } from "mongoose";
import Question from "../../database/question.model";
import Tag, { iTag } from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    // find interactions by user and group by tags
    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return { tags };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, searchQuery } = params;
    const tagFilter: FilterQuery<iTag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: new RegExp(searchQuery, "i") } }
        : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "author", model: User, select: "_id clerkId name picture" },
        { path: "tags", model: Tag, select: "_id name" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return { popularTags };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
