"use server";

import { revalidatePath } from "next/cache";
import Answer from "../../database/answer.model";
import Question from "../../database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

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
