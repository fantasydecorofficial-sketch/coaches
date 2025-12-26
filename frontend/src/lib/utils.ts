import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ABOUT = {
  phone: "+91 8717910037",
  email: "liveworkshop3d@gmail.com",
  address: "28 Sharad vihar Nagar Indore m.p 452001"
}