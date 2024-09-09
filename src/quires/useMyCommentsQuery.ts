import { API_PATH, MAX_FETCH_SIZE_FLAT, sortOption } from "@/constants";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const QUERY_KEY = ["myComments"];

const url = (page: number | undefined, userId: string) =>
  API_PATH.userCommentList({
    userId,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_FLAT,
    lastPostId: page,
  });

export function useMyCommentsQuery(userId: string) {
  return useAuthInfiniteFetchQuery({
    queryKey: QUERY_KEY,
    getUrl: (page) => url(page, userId),
  });
}
