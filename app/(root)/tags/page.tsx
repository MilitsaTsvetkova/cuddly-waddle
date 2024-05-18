import TagCard from "../../../components/cards/TagCard";
import { Filters } from "../../../components/filters/Filters";
import NoResult from "../../../components/shared/noResult/NoResult";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { TagFilters } from "../../../constants/filters";
import { getAllTags } from "../../../lib/actions/tag.action";

const Page = async () => {
  const { tags } = await getAllTags({});

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
    </>
  );
};

export default Page;