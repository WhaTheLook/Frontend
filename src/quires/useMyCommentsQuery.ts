import { API_PATH, MAX_FETCH_SIZE_FLAT, QUERY_KEY, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const url = (page: number | undefined, userId: string) =>
  API_PATH.userCommentList({
    userId,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_FLAT,
    lastPostId: page,
  });

export function useMyCommentsQuery(userId: string) {
  return useAuthInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY.myComments(),
    getUrl: (page) => url(page, userId),
    shouldTokenCheck: true,
  });
}
