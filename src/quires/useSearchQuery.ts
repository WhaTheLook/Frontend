import { API_PATH, MAX_FETCH_SIZE_GRID, sortOption } from "@/constants";

import { useInfiniteSearchFetchQuery } from "@/hooks/query/useInfiniteSearchFetchQuery";

const QUERY_KEY = ["search"];

const url = (page: number | undefined, query: string) =>
  API_PATH.searchPosts({
    searchQuery: query,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_GRID,
    lastPostId: page,
  });

export function useSearchQuery(query: string) {
  return useInfiniteSearchFetchQuery({
    queryKey: [...QUERY_KEY, query],
    getUrl: (page) => url(page, query),
  });
}
