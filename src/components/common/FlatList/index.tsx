import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Divider } from "@/components/common/Divider";
import { FlatItem } from "../FlatItem";

import { useDetailModal } from "@/hooks/useDetailModal";

import { PostListType } from "@/types";

import * as S from "./style";

interface Props {
  data: PostListType[];
}

export function FlatList({ data }: Props) {
  const { isOpen, handleClose, handleOpen } = useDetailModal();

  return (
    <Fragment>
      <S.Container>
        {data.map((conetent, index) => (
          <Fragment key={conetent.id}>
            <FlatItem
              data={conetent}
              onItemClick={() =>
                handleOpen(conetent.id, `/post/${conetent.id}`)
              }
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
