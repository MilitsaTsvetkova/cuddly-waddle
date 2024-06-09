import JobCard from "../../../components/cards/JobCard";
import { Location } from "../../../components/filters/Location";
import NoResult from "../../../components/shared/noResult/NoResult";
import Pagination from "../../../components/shared/pagination/Pagination";
import LocalSearchBar from "../../../components/shared/search/LocalSearchBar";
import { getJobs } from "../../../lib/actions/job.actions";
import { Job, SearchParamsProps } from "../../../types";

const page = async ({ searchParams }: SearchParamsProps) => {
  const isNext = true;
  const query = searchParams?.location + "" + searchParams?.q || "";
  const jobs = await getJobs({
    page: searchParams?.page ? +searchParams.page : 1,
    query,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company or Location"
          otherClasses="flex-1"
        />
        <Location
          placeholder="Select Location"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {jobs.length > 0 ? (
          jobs?.map((job: Job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <NoResult title="There are no jobs to show" />
        )}
      </div>

      {jobs.length > 1 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={isNext}
          />
        </div>
      )}
    </>
  );
};

export default page;
