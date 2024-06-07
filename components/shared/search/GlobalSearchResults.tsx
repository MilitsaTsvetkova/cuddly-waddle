"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { globalSearch } from "../../../lib/actions/general.action";
import GlobalFilters from "./GlobalFilters";

const GlobalSearchResults = () => {
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([
    { type: "tag", id: "1", title: "how to style a div" },
  ]);

  useEffect(() => {
    const fetchResult = async () => {
      setResults([]);
      setIsLoading(true);

      try {
        // Fetch data from the server
        const res = await globalSearch({ query: global, type });
        setResults(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [global, type]);

  const renderLink = (type: string | null, id: string) => {
    switch (type) {
      case "question":
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };
  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-gray-300 py-5 shadow-sm dark:bg-zinc-400">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="my-5 h-px bg-gray-200/50 dark:bg-zinc-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 size-10 animate-spin text-orange-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {results.length > 0 ? (
              results.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.id + item.type + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-gray-200/50 dark:hover:bg-zinc-500/50 "
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-dark400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Ooops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResults;
