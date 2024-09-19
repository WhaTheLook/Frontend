import { useEffect } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Comment } from "../Comment";

import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { useReplyCommentQuery } from "@/quires/useReplyCommentQuery";

import * as S from "./style";

interface Props {
  postId: number;
  parentId: number;
  childrenCount: number;
}

export function ReplyComments({ postId, parentId, childrenCount }: Props) {
  const { data, setReplyComment } = useDetailContext();

  const {
    result: { content, last },
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useReplyCommentQuery({ postId, parentId });

  const replyComments = data.comments.find(
    (comment) => comment.id === parentId
  )?.children;

  const handleViewMore = () => {
    fetchNextPage();
  };

  const showViewMoreButton = () => {
    return !last && !isLoading && !isFetchingNextPage;
  };

  useEffect(() => {
    if (!content) return;
    setReplyComment(content, parentId);
  }, [content, parentId, setReplyComment]);

  return (
    <S.Container>
      {isLoading && <LoadingSpinner color="#A2A2A2" isNoPadding={true} />}
      {replyComments?.map((comment) => (
        <Comment key={comment.id} data={comment} type="CHILDREN" />
      ))}
      {isFetchingNextPage && (
        <LoadingSpinner color="#A2A2A2" isNoPadding={true} />
      )}
      {showViewMoreButton() && (
        <S.ViewMoreButton onClick={handleViewMore}>
          {`${childrenCount - replyComments!.length}개 댓글 더보기`}
        </S.ViewMoreButton>
      )}
    </S.Container>
  );
}
