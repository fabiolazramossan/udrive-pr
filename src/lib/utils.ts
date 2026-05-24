import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as USD currency
 */
export function formatCurrency(amount: number, locale: string = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Convert cents (database storage) to dollars (display)
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Format a date in the user's locale
 */
export function formatDate(date: Date | string, locale: string = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Calculate number of rental days between two dates
 */
export function calculateDays(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
