import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import QuestionCard from "../../../components/cards/QuestionCard";
import { Filters } from "../../../components/filters/Filters";
import NoResult from "../../../components/shared/noResult/NoResult";
import Pagination from "../../../components/shared/pagination/Pagination";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { QuestionFilters } from "../../../constants/filters";
import { getSavedQuestions } from "../../../lib/actions/user.action";
import { SearchParamsProps } from "../../../types";

export const metadata: Metadata = {
  title: "Collection | Dev Overflow",
  description: "Collection Page",
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;
  const { questions, isNext } = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
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

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Home;
