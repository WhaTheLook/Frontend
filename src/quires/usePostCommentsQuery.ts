import { API_PATH, MAX_FETCH_SIZE_COMMENT } from "@/constants";
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
    queryKey: ["postComment", String(postId)],
    getUrl: (page) => url(page, postId),
    shouldTokenCheck: false,
  });
}
