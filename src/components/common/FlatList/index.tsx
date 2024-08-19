import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Divider } from "@/components/common/Divider";
import { FlatItem } from "../FlatItem";
import { ApiErrorBoundary } from "../ApiErrorBoundary";

import { PostListContentType } from "@/types";

import { useDetailModalContext } from "@/hooks/useDetailModalContext";

import * as S from "./style";

interface Props {
  data: PostListContentType[];
}

export function FlatList({ data }: Props) {
  const { handleDetailOpen } = useDetailModalContext();

  const handlePostItemClick = (postId: number) => {
    handleDetailOpen(postId, `/post/${postId}`);
  };

  return (
    <Fragment>
      <S.Container>
        {data.map((content, index) => (
          <Fragment key={content.id}>
            <FlatItem
              data={content}
              onItemClick={() => handlePostItemClick(content.id)}
            />
            {index < data.length - 1 && <Divider />}
          </Fragment>
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
