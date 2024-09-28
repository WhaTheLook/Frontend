import { API_PATH, MAX_FETCH_SIZE_COMMENT, QUERY_KEY } from "@/constants";
import { CommentsType } from "@/types";

import { useAuthInfiniteFetchQuery } from "@/hooks/query/useAuthInfiniteFetchQuery";

const url = (page: number | undefined, postId: number, parentId: number) =>
  API_PATH.replyCommentList({
    parentId,
    postId,
    size: MAX_FETCH_SIZE_COMMENT,
    lastCommentId: page,
  });

interface Props {
    postId: number;
    parentId: number;
}

export function useReplyCommentQuery({ postId, parentId }: Props) {
  return useAuthInfiniteFetchQuery<CommentsType>({
    queryKey: QUERY_KEY.replyComment({postId, parentId}),
    getUrl: (page) => url(page, postId, parentId),
    shouldTokenCheck: false,
  });
}
