"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HomePageFilters } from "../../constants/filters";
import { formUrlQuery } from "../../lib/url";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState(searchParams.get("filter") ?? "");
  const handleTypeClick = (item: string): void => {
    // Added type annotation
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`body-medium rounded-lg p-6 py-3 capitalize shadow-none 
          ${active === filter.value ? "bg-gray-300 text-orange-500" : "bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-200"}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
