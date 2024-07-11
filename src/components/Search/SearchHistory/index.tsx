import { useState } from "react";

import { XCircleIcon } from "@/components/Icons/XCircleIcon";

import * as S from "./style";

export function SearchHistory() {
  const [searchedTags, setSearchTags] = useState<string[]>([]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.InfoTextBox>
          <S.InfoText>최근 검색어</S.InfoText>
          <S.InfoSubTextDiv>
            <S.SubButton>검색 기록 끄기</S.SubButton>|
            <S.SubButton>전체 기록 삭제</S.SubButton>
          </S.InfoSubTextDiv>
        </S.InfoTextBox>
        <S.Tags>
          {searchedTags.map((tag) => (
            <S.Tag key={tag}>
              <S.Text>#{tag}</S.Text>
              <S.XButton>
                <XCircleIcon size={28} color="#595959" />
              </S.XButton>
            </S.Tag>
          ))}
        </S.Tags>
      </S.Wrapper>
    </S.Container>
  );
}
