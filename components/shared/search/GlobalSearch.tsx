"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "../../../lib/url";
import GlobalSearchResults from "./GlobalSearchResults";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("global");
  const [value, setValue] = useState(query ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const searchContianerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContianerRef.current &&
        !searchContianerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setValue("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathname]);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      if (value) {
        const newUrl = formUrlQuery({
          key: "global",
          params: searchParams.toString(),
          value,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            keysToRemove: ["global", "type"],
            params: searchParams.toString(),
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(debouncer);
  }, [value, pathname, query, router, searchParams]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContianerRef}
    >
      <div
        className="background-light800_darkgradient relative 
      flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={value}
          className="paragraph-regular no-focus text-dark400_light700
          placeholder border-none bg-transparent shadow-none  outline-none"
          onChange={(e) => {
            setValue(e.target.value);
            if (!isOpen) setIsOpen(true);

            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
        />
      </div>
      {isOpen && <GlobalSearchResults />}
    </div>
  );
};

export default GlobalSearch;
