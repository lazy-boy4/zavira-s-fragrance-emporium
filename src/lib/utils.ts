import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** All store prices are Bangladeshi Taka. One formatter, one grouping. */
export const formatBDT = (amount: number) => `৳${Math.round(amount).toLocaleString("en-US")}`;
