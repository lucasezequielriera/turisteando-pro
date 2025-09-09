"use client";

export type AccessKind = "city" | "all" | "lifetime";

export function hasAllAccess(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("tp_access_all") === "1" ||
         localStorage.getItem("tp_access_life") === "1";
}

export function hasCityAccess(slug: string): boolean {
  if (typeof window === "undefined") return false;
  if (hasAllAccess()) return true;
  return localStorage.getItem(`tp_city_${slug}`) === "1";
}

export function grantAccess(kind: AccessKind, slug?: string) {
  if (typeof window === "undefined") return;
  if (kind === "all") localStorage.setItem("tp_access_all", "1");
  if (kind === "lifetime") localStorage.setItem("tp_access_life", "1");
  if (kind === "city" && slug) localStorage.setItem(`tp_city_${slug}`, "1");
}