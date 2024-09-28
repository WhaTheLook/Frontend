import { API_PATH, MAX_FETCH_SIZE_COMMENT, QUERY_KEY } from "@/constants";
import { CommentsType } from "@/types";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const url = (page: number | undefined, postId: number) =>
  API_PATH.commentList({
    postId,
    size: MAX_FETCH_SIZE_COMMENT,
    lastCommentId: page,
  });

export function usePostCommentsQuery(postId: number) {
  return useAuthInfiniteFetchQuery<CommentsType>({
    queryKey: QUERY_KEY.postComments(postId),
    getUrl: (page) => url(page, postId),
    shouldTokenCheck: false,
  });
}
