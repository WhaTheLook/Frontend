import { API_PATH, MAX_FETCH_SIZE_GRID, QUERY_KEY, sortOption } from "@/constants";

import { useInfiniteSearchFetchQuery } from "@/hooks/query/useInfiniteSearchFetchQuery";


const url = (page: number | undefined, query: string) =>
  API_PATH.searchPosts({
    searchQuery: query,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_GRID,
    lastPostId: page,
  });

export function useSearchQuery(query: string) {
  return useInfiniteSearchFetchQuery({
    queryKey: QUERY_KEY.search(query),
    getUrl: (page) => url(page, query),
  });
}
