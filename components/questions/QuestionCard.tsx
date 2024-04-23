interface Props {
  question: any;
}

const QuestionCard = ({ question }: Props) => {
  return <div>{question.title}</div>;
};

export default QuestionCard;
