import { Fragment } from "react";

import { Detail } from "@/page/Detail";
import { DetailModal } from "@/components/Detail/DetailModal";
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
        <Detail />
      </DetailModal>
    </Fragment>
  );
}
