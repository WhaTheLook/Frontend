import { API_PATH, MAX_FETCH_SIZE_GRID, sortOption } from "@/constants";

import { PostListContentType } from "@/types";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const QUERY_KEY = ["bookmark"];

const url = (page: number | undefined, userId: string) =>
  API_PATH.bookmarkList({
    userId,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_GRID,
    lastPostId: page,
  });

export function useBookmarkQuery(userId: string) {
  return useAuthInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY,
    getUrl: (page) => url(page, userId),
    shouldTokenCheck: true,
  });
}
