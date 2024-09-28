import { API_PATH, categoryOption, MAX_FETCH_SIZE_FLAT, QUERY_KEY, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteFetchQuery } from "@/hooks/query/useInfiteFetchQuery";

const url = (page: number | undefined) =>
    API_PATH.postList({
        category: categoryOption.QNA,
        sortBy: sortOption.POPULAR,
        size: MAX_FETCH_SIZE_FLAT,
        lastPostId: page,
    })

export function useQnaPopularQuery() {
  return useInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY.home({category: "질문하기", sort: "popular"}),
    getUrl: (page) => url(page),
  });
}
