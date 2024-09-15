import { Fragment, useEffect, useRef, useState } from "react";

import { Comment } from "@/components/Detail/Comment";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ReplyComments } from "../ReplyComments";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { usePostCommentsQuery } from "@/quires/usePostCommentsQuery";

import * as S from "./style";

export function CommentsWrapper() {
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { data, setComment } = useDetailContext();

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last },
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = usePostCommentsQuery(data.id);

  const intersecting = useInfiniteScoll(fetchMoreElement, !last);

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // 클릭된 댓글의 상태를 토글
    }));
  };

  useEffect(() => {
    if (!content) return;
    setComment(content);
  }, [content, setComment]);

  useEffect(() => {
    if (intersecting && !last) {
      fetchNextPage();
    }
  }, [intersecting, fetchNextPage, last]);

  return (
    <S.Container>
      {isLoading && <LoadingSpinner color="#A2A2A2" isNoPadding={true} />}
      {data.comments.map((comment) => (
        <Fragment key={comment.id}>
          <Comment
            data={comment}
            toggleReplyShow={toggleReplies}
            type="PARENT"
            isShowReply={showReplies[comment.id]}
          />
          {showReplies[comment.id] && (
            <ReplyComments
              postId={data.id}
              parentId={comment.id}
              childrenCount={comment.childrenCount}
            />
          )}
        </Fragment>
      ))}
      {isFetchingNextPage && (
        <LoadingSpinner color="#A2A2A2" isNoPadding={true} />
      )}
      <div ref={fetchMoreElement}></div>
    </S.Container>
  );
}
