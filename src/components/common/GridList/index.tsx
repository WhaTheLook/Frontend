import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { ApiErrorBoundary } from "../ApiErrorBoundary";
import { GridItem } from "../GridItem";

import { PostListContentType } from "@/types";

import { useDetailModalContext } from "@/hooks/useDetailModalContext";

import * as S from "./style";

interface Props {
  data: PostListContentType[];
}

export function GridList({ data }: Props) {
  const { handleDetailOpen } = useDetailModalContext();

  const handlePostItemClick = (postId: number) => {
    handleDetailOpen(postId, `/post/${postId}`);
  };

  return (
    <Fragment>
      <S.Container>
        {data.map((content) => (
          <GridItem
            key={content.id}
            data={content}
            onItemClick={() => handlePostItemClick(content.id)}
          />
        ))}
      </S.Container>
      <DetailModal>
        <ApiErrorBoundary>
          <PostDetail />
        </ApiErrorBoundary>
      </DetailModal>
    </Fragment>
  );
}
