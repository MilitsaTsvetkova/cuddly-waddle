"use server";

import Interaction from "../../database/interaction.model";
import Question from "../../database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // update view count for question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });
      if (existingInteraction) {
        return;
      }
      // create interaction
      await Interaction.create({
        action: "view",
        user: userId,
        question: questionId,
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
