import { PostListType } from "@/types";

import { AskList } from "@/components/common/AskList";
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
        <AskList data={data} />
      )}
    </S.Container>
  );
}
