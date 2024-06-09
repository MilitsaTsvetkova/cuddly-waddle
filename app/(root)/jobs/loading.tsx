import { Skeleton } from "../../../components/ui/skeleton";
import { generateMockArray } from "../../../lib/utils";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mb-12 mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="flex flex-col gap-6">
        {generateMockArray().map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
