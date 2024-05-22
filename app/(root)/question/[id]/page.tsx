import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Answer from "../../../../components/forms/Answer";
import AllAnswers from "../../../../components/shared/allAnswers/AllAnswers";
import Metric from "../../../../components/shared/metric/Metric";
import ParseHTML from "../../../../components/shared/parseHTML/ParseHTML";
import Tag from "../../../../components/shared/tag/Tag";
import Votes from "../../../../components/shared/votes/Votes";
import { getQuestionById } from "../../../../lib/actions/question.action";
import { getUserById } from "../../../../lib/actions/user.action";
import { getTimestamp } from "../../../../lib/dates";
import { formatNumber } from "../../../../lib/numbers";
import { EntityType, SearchParamsProps } from "../../../../types/index.d";

interface Props extends SearchParamsProps {
  params: {
    id: string;
  };
}

const page = async ({ params, searchParams }: Props) => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  const { question } = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type={EntityType.QUESTION}
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML content={question.content} />
      <div>
        {question.tags.map((tag: any) => (
          <Tag key={tag._id} id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <AllAnswers
        questionId={question._id}
        userId={mongoUser._id}
        totalAnswers={question.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <Answer
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default page;
