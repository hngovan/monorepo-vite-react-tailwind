import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export { cva, type VariantProps } from "class-variance-authority";
