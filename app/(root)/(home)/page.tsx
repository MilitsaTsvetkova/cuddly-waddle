import Link from "next/link";
import QuestionCard from "../../../components/cards/QuestionCard";
import { Filters } from "../../../components/filters/Filters";
import HomeFilters from "../../../components/filters/HomeFilters";
import NoResult from "../../../components/shared/noResult/NoResult";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { Button } from "../../../components/ui/button";
import { HomePageFilters } from "../../../constants/filters";
import { Question } from "../../../types";

const questions: Question[] = [
  {
    id: "1",
    title: "How to learn TypeScript?",
    tags: [
      { id: "1", name: "programming" },
      { id: "2", name: "typescript" },
      { id: "3", name: "web development" },
    ],
    author: {
      id: "123",
      name: "John Doe",
      picture: "https://example.com/johndoe.jpg",
    },
    upvotes: 100,
    views: 1500,
    answers: [],
    createdAt: new Date("2024-04-20T12:00:00Z"),
  },
  {
    id: "2",
    title: "Best practices in TypeScript",
    tags: [
      { id: "2", name: "typescript" },
      { id: "4", name: "best practices" },
    ],
    author: {
      id: "124",
      name: "Jane Smith",
      picture: "https://example.com/janesmith.jpg",
    },
    upvotes: 75,
    views: 900,
    answers: [],
    createdAt: new Date("2023-04-21T15:00:00Z"),
  },
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
