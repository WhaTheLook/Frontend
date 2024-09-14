import { API_PATH, MAX_FETCH_SIZE_FLAT, sortOption } from "@/constants";

import { PostListContentType } from "@/types";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const QUERY_KEY = ["myPosts"];

const url = (page: number | undefined, userId: string) =>
  API_PATH.userPostList({
    userId,
    sortBy: sortOption.LATEST,
    size: MAX_FETCH_SIZE_FLAT,
    lastPostId: page,
  });

export function useMyPostsQuery(userId: string) {
  return useAuthInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY,
    getUrl: (page) => url(page, userId),
    shouldTokenCheck: true,
  });
}
