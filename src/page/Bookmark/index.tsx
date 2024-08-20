import { ScrollButton } from "@/components/common/ScrollButton";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";
import { BookmarkList } from "@/components/Bookmark/BookmarkList";

import * as S from "./style";

export function Bookmark() {
  return (
    <S.Container>
      <S.Title>북마크</S.Title>
      <ApiErrorBoundary>
        <BookmarkList />
      </ApiErrorBoundary>
      <ScrollButton />
    </S.Container>
  );
}
