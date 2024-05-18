import Image from "next/image";
import Link from "next/link";
import { AnswerFilters } from "../../../constants/filters";
import { getAnswers } from "../../../lib/actions/answer.action";
import { getTimestamp } from "../../../lib/dates";
import { Filters } from "../../filters/Filters";
import ParseHTML from "../parseHTML/ParseHTML";
import Votes from "../votes/Votes";
interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({ questionId, userId, totalAnswers }: Props) => {
  const { answers } = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filters placeholder="Select filter" filters={AnswerFilters} />
      </div>
      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="profile"
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-dark400_light500 mt-0.5 line-clamp-1">
                      <span className="ml-0.5 max-sm:hidden"></span> answered{" "}
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML content={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;