"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Define types for search results
export interface TourSearchResult {
  id: string;
  title: string;
  slug: string;
  price?: number;
  discountPrice?: number;
  images: string[];
  shortDescription?: string;
  location?: string;
  duration?: number;
}

// Function to search tours
async function searchTours(query: string): Promise<TourSearchResult[]> {
  if (!query || query.length < 2) return [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const response = await fetch(
      `${baseUrl}/api/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      console.error(`Search API responded with status: ${response.status}`);
      throw new Error(`Search failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search results:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error searching tours:", error);
    return [];
  }
}

export function useTourSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Properly debounce the search query using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const {
    data: results = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["tour-search", debouncedQuery],
    queryFn: () => searchTours(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    query,
    setQuery,
    results,
    isLoading,
    isError,
    error,
  };
}
