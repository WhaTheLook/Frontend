import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { GridItem } from "../GridItem";

import { PostListContentType } from "@/types";

import { useDetailModal } from "@/hooks/useDetailModal";

import * as S from "./style";

interface Props {
  data: PostListContentType[];
}

export function GridList({ data }: Props) {
  const { isOpen, handleOpen, handleClose } = useDetailModal();

  const handlePostItemClick = (postId: number) => {
    handleOpen(postId, `/post/${postId}`);
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
      <DetailModal isOpen={isOpen} onOutSideClick={() => handleClose("/")}>
        <PostDetail />
      </DetailModal>
    </Fragment>
  );
}
