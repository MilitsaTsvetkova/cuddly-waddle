import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMockArray = (length = 10) => {
  return Array.from({ length }, (_, i) => i + 1);
};
