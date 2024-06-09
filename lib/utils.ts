import { type ClassValue, clsx } from "clsx";
import { countries } from "countries-list";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMockArray = (length = 10) => {
  return Array.from({ length }, (_, i) => i + 1);
};

export const getListOfCountries = () => {
  return Object.values(countries)
    .map((item: any) => ({ name: item.name, value: item.name }))
    .sort();
};
