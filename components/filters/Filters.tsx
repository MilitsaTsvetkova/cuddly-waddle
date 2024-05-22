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
          body-regular light-border background-light800_dark300
          text-dark500_light700 border px-5 py-2.5
          `}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
