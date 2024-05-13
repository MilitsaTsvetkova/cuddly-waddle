import { auth } from "@clerk/nextjs";
import QuestionCard from "../../../components/cards/QuestionCard";
import { Filters } from "../../../components/filters/Filters";
import NoResult from "../../../components/shared/noResult/NoResult";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { QuestionFilters } from "../../../constants/filters";
import { getSavedQuestions } from "../../../lib/actions/user.action";

const Home = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;
  const { questions } = await getSavedQuestions({ clerkId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          placeholder="Select a filter"
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResult
            title="There's no saved questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
