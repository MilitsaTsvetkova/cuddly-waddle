import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GlobalSearchFilters } from "../../../constants/filters";
import { formUrlQuery } from "../../../lib/url";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const [active, setActive] = useState(type || "");

  const handleTypeClick = (item: string): void => {
    // Added type annotation
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        key: "type",
        params: searchParams.toString(),
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        key: "type",
        params: searchParams.toString(),
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((filter) => (
          <button
            type="button"
            onClick={() => handleTypeClick(filter.value)}
            key={filter.value}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-gray-200 dark:hover:text-orange-500 ${active === filter.value ? "bg-orange-500 text-gray-100" : "bg-gray-300 text-zinc-600 hover:text-orange-500 dark:bg-zinc-800"}`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
