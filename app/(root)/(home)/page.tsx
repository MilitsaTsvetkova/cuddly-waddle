import Link from "next/link";
import { Filters } from "../../../components/filters/Filters";
import HomeFilters from "../../../components/filters/HomeFilters";
import QuestionCard from "../../../components/questions/QuestionCard";
import NoResult from "../../../components/shared/noResult/NoResult";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { Button } from "../../../components/ui/button";
import { HomePageFilters } from "../../../constants/filters";

const questions = [
  // {
  //   id: 1,
  //   title: "How to create a new project in React?",
  //   tags: [
  //     { id: 1, name: "React" },
  //     { id: 2, name: "JavaScript" },
  //   ],
  //   author: "John Doe",
  //   upvotes: 10,
  //   views: 100,
  //   answers: 2,
  //   createdAt: "2021-09-01",
  // },
  // {
  //   id: 2,
  //   title: "How to center a div?",
  //   tags: [
  //     { id: 1, name: "React" },
  //     { id: 2, name: "JavaScript" },
  //   ],
  //   author: "John Doe",
  //   upvotes: 10,
  //   views: 100,
  //   answers: 2,
  //   createdAt: "2021-09-02",
  // },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-gray-100">
            Ask a Question
          </Button>
        </Link>
      </div>
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
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <NoResult
            title="There's no questions to show"
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
