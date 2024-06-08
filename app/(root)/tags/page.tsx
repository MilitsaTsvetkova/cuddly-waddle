import { Metadata } from "next";
import TagCard from "../../../components/cards/TagCard";
import { Filters } from "../../../components/filters/Filters";
import NoResult from "../../../components/shared/noResult/NoResult";
import Pagination from "../../../components/shared/pagination/Pagination";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { TagFilters } from "../../../constants/filters";
import { getAllTags } from "../../../lib/actions/tag.action";
import { SearchParamsProps } from "../../../types";

export const metadata: Metadata = {
  title: "Tags | Dev Overflow",
  description: "Tags Page",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        <Filters
          placeholder="Select a filter"
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No tags found"
            description="It looks like there are no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Page;
