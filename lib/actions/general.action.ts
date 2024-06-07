"use server";

import Answer from "../../database/answer.model";
import Question from "../../database/question.model";
import Tag from "../../database/tag.model";
import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = {
      $regex: query,
      $options: "i",
    };

    let results: any[] = [];

    const modelsAndTypes = [
      { model: User, type: "user", searchField: "name" },
      { model: Question, type: "question", searchField: "title" },
      { model: Answer, type: "answer", searchField: "content" },
      { model: Tag, type: "tag", searchField: "name" },
    ];

    const typeLower = type?.toLowerCase();

    if (
      !typeLower ||
      !["user", "question", "answer", "tag"].includes(typeLower)
    ) {
      // SEARCH ACROSS EVERYTHING
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkId
                : type === "answer"
                  ? result.question
                  : result._id,
          }))
        );
      }
    } else {
      // SEARCH ACROSS SPECIFIC TYPE
      const modelInfo = modelsAndTypes.find((type) => type.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const { model, searchField } = modelInfo;

      const queryResults = await model
        .find({
          [searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((result) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : result[searchField],
        type,
        id:
          type === "user"
            ? result.clerkId
            : type === "answer"
              ? result.question
              : result._id,
      }));
    }

    return JSON.stringify(results);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
