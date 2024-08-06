import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Divider } from "@/components/common/Divider";
import { FlatItem } from "../FlatItem";

import { PostListContentType } from "@/types";

import { useDetailModal } from "@/hooks/useDetailModal";

import * as S from "./style";

interface Props {
  data: PostListContentType[];
}

export function FlatList({ data }: Props) {
  const { isOpen, handleClose, handleOpen } = useDetailModal();

  const handlePostItemClick = (postId: number) => {
    handleOpen(postId, `/post/${postId}`);
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
      <DetailModal isOpen={isOpen} onOutSideClick={() => handleClose("/")}>
        <PostDetail />
      </DetailModal>
    </Fragment>
  );
}
