import { HeartIcon } from "@/components/Icons/HeartIcon";
import { OptionIcon } from "@/components/Icons/OptionIcon";

import * as S from "./style";

export function Comment() {
  return (
    <S.Container>
      <S.Main>
        <S.ProfileWrapper>
          <S.ProfileImage src="https://whathelook.s3.ap-northeast-2.amazonaws.com/356e73e6-f70c-4ca3-a763-967974c5498e_1.png" />
          <S.Name>기억</S.Name>
        </S.ProfileWrapper>
        <S.ContentWrapper>
          <S.Content>본문</S.Content>
          <S.ContentButtonBox>
            <S.ContentButton>대댓글 보기</S.ContentButton>
            <S.ContentButton>댓글 달기</S.ContentButton>
          </S.ContentButtonBox>
        </S.ContentWrapper>
      </S.Main>
      <S.IconWrapper>
        <S.IconButton>
          <HeartIcon size={15} color="#000" />
        </S.IconButton>
        <S.IconButton>
          <OptionIcon size={15} color="#000" />
        </S.IconButton>
      </S.IconWrapper>
    </S.Container>
  );
}
