import { Fragment } from "react";

import { Detail } from "@/page/Detail";
import { DetailModal } from "@/components/Detail/DetailModal";
import { Divider } from "@/components/common/Divider";
import { FlatItem } from "../FlatItem";

import { PostListContentType } from "@/types";

import { useDetailModalContext } from "@/hooks/contexts/useDetailModalContext";

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
        <Detail />
      </DetailModal>
    </Fragment>
  );
}
