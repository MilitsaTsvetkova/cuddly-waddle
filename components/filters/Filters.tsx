"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "../../lib/url";

interface Props {
  placeholder: string;
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

export function Filters({
  placeholder,
  filters,
  otherClasses,
  containerClasses,
}: Props) {
  const searchParams = useSearchParams();
  const route = useRouter();
  const paramFilter = searchParams.get("filter");
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    route.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        value={paramFilter ?? undefined}
      >
        <SelectTrigger
          className={`${otherClasses} 
          body-regular light-border text-dark500_light700
          rounded border bg-gray-200 px-5 py-2.5 dark:bg-gray-400
          `}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-gray-200 dark:bg-gray-400">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-gray-300 dark:focus:bg-gray-500"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
