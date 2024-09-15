import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Comment } from "../Comment";

import { CommentsType } from "@/types";

import { useReplyCommentQuery } from "@/quires/useReplyCommentQuery";

import * as S from "./style";

interface Props {
  postId: number;
  parentId: number;
  childrenCount: number;
}

export function ReplyComments({ postId, parentId, childrenCount }: Props) {
  const [data, setData] = useState<CommentsType[]>([]);

  const {
    result: { content, last },
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useReplyCommentQuery({ postId, parentId });

  const handleViewMore = () => {
    fetchNextPage();
  };

  const showViewMoreButton = () => {
    return !last && !isLoading && !isFetchingNextPage;
  };

  useEffect(() => {
    if (!content) return;
    setData(content);
  }, [content]);

  return (
    <S.Container>
      {isLoading && <LoadingSpinner color="#A2A2A2" isNoPadding={true} />}
      {data.map((comment) => (
        <Comment key={comment.id} data={comment} type="CHILDREN" />
      ))}
      {isFetchingNextPage && (
        <LoadingSpinner color="#A2A2A2" isNoPadding={true} />
      )}
      {showViewMoreButton() && (
        <S.ViewMoreButton onClick={handleViewMore}>
          {`${childrenCount - data.length}개 댓글 더보기`}
        </S.ViewMoreButton>
      )}
    </S.Container>
  );
}
