import { API_PATH, categoryOption, MAX_FETCH_SIZE_GRID, QUERY_KEY, sortOption } from "@/constants";
import { PostListContentType } from "@/types";

import { useInfiniteFetchQuery } from "@/hooks/query/useInfiteFetchQuery";


const url = (page: number | undefined) =>
    API_PATH.postList({
        category: categoryOption.SHARE,
        sortBy: sortOption.LATEST,
        size: MAX_FETCH_SIZE_GRID,
        lastPostId: page,
    })

export function useSharedLatestQuery() {
  return useInfiniteFetchQuery<PostListContentType>({
    queryKey: QUERY_KEY.home({category: "정보공유", sort: "latest"}),
    getUrl: (page) => url(page),
  });
}
