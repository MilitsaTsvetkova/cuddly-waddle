import { getUserQuestions } from "../../../lib/actions/user.action";
import { SearchParamsProps } from "../../../types";
import QuestionCard from "../../cards/QuestionCard";
import Pagination from "../pagination/Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { questions, isNext } = await getUserQuestions({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          question={question}
          clerkId={clerkId}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default QuestionTab;
