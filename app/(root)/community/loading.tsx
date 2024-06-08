import { Skeleton } from "../../../components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <Skeleton key={i} className="h-60 w-full rounded-2xl sm:w-[260px]" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
