import { useEffect, useRef } from "react";

import { Comment } from "@/components/Detail/Comment";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { useInfiniteScoll } from "@/hooks/useInfiniteScoll";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { usePostCommentsQuery } from "@/quires/usePostCommentsQuery";

import * as S from "./style";

export function CommentsWrapper() {
  const { data, setComment } = useDetailContext();

  const fetchMoreElement = useRef<HTMLDivElement>(null);

  const {
    result: { content, last },
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = usePostCommentsQuery(data.id);

  const intersecting = useInfiniteScoll(fetchMoreElement, !last);

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
        <Comment key={comment.id} data={comment} />
      ))}
      {isFetchingNextPage && (
        <LoadingSpinner color="#A2A2A2" isNoPadding={true} />
      )}
      <div ref={fetchMoreElement}></div>
    </S.Container>
  );
}
