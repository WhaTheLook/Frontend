import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { SharedItem } from "../SharedItem";

import { useDetailModal } from "@/hooks/useDetailModal";

import { PostListType } from "@/types";

import * as S from "./style";

interface Props {
  data: PostListType[];
}

export function SharedList({ data }: Props) {
  const { isOpen, handleOpen, handleClose } = useDetailModal();

  return (
    <Fragment>
      <S.Container>
        {data.map((content) => (
          <SharedItem
            key={content.id}
            data={content}
            onItemClick={() => handleOpen(content.id, `post/${content.id}`)}
          />
        ))}
      </S.Container>
      <DetailModal isOpen={isOpen} onOutSideClick={() => handleClose("/")}>
        <PostDetail />
      </DetailModal>
    </Fragment>
  );
}
