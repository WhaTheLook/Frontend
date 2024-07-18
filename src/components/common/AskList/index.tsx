import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Divider } from "@/components/common/Divider";
import { AskItem } from "../AskItem";

import { useDetailModal } from "@/hooks/useDetailModal";

import { PostListType } from "@/types";

import * as S from "./style";

interface Props {
  data: PostListType[];
}

export function AskList({ data }: Props) {
  const { isOpen, handleClose, handleOpen } = useDetailModal();

  return (
    <Fragment>
      <S.Container>
        {data.map((conetent, index) => (
          <Fragment key={conetent.id}>
            <AskItem
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
