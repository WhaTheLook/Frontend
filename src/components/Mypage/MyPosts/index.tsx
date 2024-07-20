import { PostListType } from "@/types";

import { FlatList } from "@/components/common/FlatList";
import { NothingInfo } from "../NothingInfo";

import mock from "@/mock";

import * as S from "./style";

export function MyPosts() {
  const data = mock.MyPageMockData as PostListType[];

  return (
    <S.Container>
      {data.length === 0 ? (
        <NothingInfo menu="post" />
      ) : (
        <FlatList data={data} />
      )}
    </S.Container>
  );
}
