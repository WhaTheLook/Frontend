import { API_PATH, categoryOption, MAX_FETCH_SIZE_FLAT, sortOption } from "@/constants";

import { PostListContentType } from "@/types";

import { useInfiniteFetchQuery } from "@/hooks/query/useInfiteFetchQuery";

const QUERY_KEY = ["home", 'qnaPopular'];

const url = (page: number | undefined) =>
    API_PATH.postList({
        category: categoryOption.QNA,
        sortBy: sortOption.POPULAR,
        size: MAX_FETCH_SIZE_FLAT,
        lastPostId: page,
    })

export function useQnaPopularQuery() {
  return useInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY,
    getUrl: (page) => url(page),
  });
}
