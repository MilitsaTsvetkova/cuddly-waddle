"use client";
import { useState } from "react";
import { HomePageFilters } from "../../constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const [active, setActive] = useState("");
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => setActive(filter.value)}
          className={`body-medium rounded-lg p-6 py-3 capitalize shadow-none 
          ${active === filter.value ? "bg-gray-300 text-primary" : "bg-gray-100 text-gray-400 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-zinc-400"}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
