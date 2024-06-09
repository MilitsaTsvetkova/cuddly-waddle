import { getEmojiFlag, TCountryCode } from "countries-list";
import Image from "next/image";
import Link from "next/link";
import { Job } from "../../types";

const LocationInfo = ({ job }: { job: Job }) => {
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      {job.job_country ? getEmojiFlag(job.job_country as TCountryCode) : "🌍"}
      <p className="body-medium text-dark400_light700">
        {`${job.job_city ? job.job_city + "," : ""} ${job.job_state ? job.job_state + "," : ""} ${job.job_country ? job.job_country : ""}`}
      </p>
    </div>
  );
};

const JobCard = ({ job }: { job: Job }) => {
  return (
    <article className="background-light900_dark300 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <LocationInfo job={job} />
      </div>
      <div className="flex items-center gap-6">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          width={64}
          height={64}
        />
      </div>
      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{job.job_title}</p>
          <div className="hidden sm:flex">
            <LocationInfo job={job} />
          </div>
        </div>
        <p className="body-regular text-dark500_light700  mt-2 line-clamp-2">
          {job.job_description}
        </p>
        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock-2.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <p className="body-medium primary-text-gradient">
                {job.job_employment_type}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="currency"
                width={20}
                height={20}
              />
              <p className="body-medium primary-text-gradient">
                {job.job_max_salary ?? "Not disclosed"}
              </p>
            </div>
          </div>
          <Link
            href={job?.job_apply_link ?? ""}
            className="flex items-center gap-2"
          >
            <p className="body-semibold primary-text-gradient">View job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
