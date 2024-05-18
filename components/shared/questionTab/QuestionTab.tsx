import { getUserQuestions } from "../../../lib/actions/user.action";
import { SearchParamsProps } from "../../../types";
import QuestionCard from "../../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { questions, totalQuestions } = await getUserQuestions({
    userId,
    page: 1,
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
    </>
  );
};

export default QuestionTab;
