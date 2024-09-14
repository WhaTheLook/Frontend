import { API_PATH, categoryOption, MAX_FETCH_SIZE_FLAT, sortOption } from "@/constants";

import { PostListContentType } from "@/types";

import { useInfiniteFetchQuery } from "@/hooks/query/useInfiteFetchQuery";

const QUERY_KEY = ["home", 'qnaLatest'];

const url = (page: number | undefined) =>
    API_PATH.postList({
        category: categoryOption.QNA,
        sortBy: sortOption.LATEST,
        size: MAX_FETCH_SIZE_FLAT,
        lastPostId: page,
    })

export function useQnaLatestQuery() {
  return useInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY,
    getUrl: (page) => url(page),
  });
}
