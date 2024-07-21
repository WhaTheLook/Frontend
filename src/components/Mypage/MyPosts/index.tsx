import { PostListType } from "@/types";

import { FlatList } from "@/components/common/FlatList";
import { NothingInfo } from "../../common/NothingInfo";

import mock from "@/mock";

import * as S from "./style";

export function MyPosts() {
  const data = mock.MyPageMockData as PostListType[];

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
