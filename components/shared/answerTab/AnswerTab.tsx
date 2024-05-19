import { getUserAnswers } from "../../../lib/actions/user.action";
import { SearchParamsProps } from "../../../types";
import AnswerCard from "../../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { totalAnswers, answers } = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {answers.map((answer) => (
        <AnswerCard key={answer._id} answer={answer} clerkId={clerkId} />
      ))}
    </>
  );
};

export default AnswerTab;
