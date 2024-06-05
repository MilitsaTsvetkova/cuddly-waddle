import { getUserAnswers } from "../../../lib/actions/user.action";
import { SearchParamsProps } from "../../../types";
import AnswerCard from "../../cards/AnswerCard";
import Pagination from "../pagination/Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { answers, isNext } = await getUserAnswers({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <>
      {answers.map((answer) => (
        <AnswerCard key={answer._id} answer={answer} clerkId={clerkId} />
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

export default AnswerTab;
