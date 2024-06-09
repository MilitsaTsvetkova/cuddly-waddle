"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery } from "../../lib/url";
import { getListOfCountries } from "../../lib/utils";

interface Props {
  placeholder: string;
  otherClasses?: string;
  containerClasses?: string;
}

export function Location({
  placeholder,
  otherClasses,
  containerClasses,
}: Props) {
  const [filters, setFilters] = useState<{ name: any; value: any }[]>([]);
  const searchParams = useSearchParams();
  const route = useRouter();
  const paramFilter = searchParams.get("location");
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });
    route.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    const countries = getListOfCountries();
    setFilters(countries);
  }, []);

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        value={paramFilter ?? undefined}
      >
        <SelectTrigger
          className={`${otherClasses} 
          body-regular light-border text-dark500_light700
          rounded border bg-gray-100 px-5 py-2.5 dark:bg-gray-400
          `}
        >
          <div>
            <Image
              src="/assets/icons/location.svg"
              width={18}
              height={18}
              alt="location"
              className="mr-2"
            />
          </div>
          <div className="line-clamp-1 flex-1 text-left mr-2">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-gray-100 dark:bg-gray-400">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-500"
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
