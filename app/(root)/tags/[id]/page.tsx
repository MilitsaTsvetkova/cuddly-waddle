import QuestionCard from "../../../../components/cards/QuestionCard";
import NoResult from "../../../../components/shared/noResult/NoResult";
import Pagination from "../../../../components/shared/pagination/Pagination";
import LocalSearchBar from "../../../../components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "../../../../lib/actions/tag.action";
import { URLProps } from "../../../../types";

const page = async ({ params, searchParams }: URLProps) => {
  const { questions, tagTitle, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams?.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResult
            title="There's no tag questions to show"
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

export async function generateMetadata({ params }: URLProps) {
  const { tagTitle } = await getQuestionsByTagId({
    tagId: params.id,
  });
  return {
    title: tagTitle + " | Dev Overflow",
    description: "Tag Details page",
  };
}

export default page;
