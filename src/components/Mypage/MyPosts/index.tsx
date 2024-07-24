import { FlatList } from "@/components/common/FlatList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { PostListType } from "@/types";

import * as S from "./style";

export function MyPosts() {
  const data = [] as PostListType[];

  return (
    <S.Container>
      {data.length === 0 ? (
        <NothingInfo contentType="post" />
      ) : (
        <FlatList data={data} />
      )}
    </S.Container>
  );
}
