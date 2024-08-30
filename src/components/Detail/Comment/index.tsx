import { useSelector } from "react-redux";

import { HeartIcon } from "@/components/Icons/HeartIcon";
import { OptionIcon } from "@/components/Icons/OptionIcon";

import { CommentsType } from "@/types";
import { calculateDaysAgo } from "@/utils";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  data: CommentsType;
}

export function Comment({ data }: Props) {
  const {
    author: { kakaoId, name, profileImage },
  } = data;

  const signInUser = useSelector(selectCurrentUser);

  const isLoginUser = () => {
    return kakaoId === signInUser?.kakaoId;
  };

  return (
    <S.Container>
      <S.Main>
        <S.ProfileImage src={profileImage} />
        <S.ContentWrapper>
          <S.NameBox>
            <S.Name>{name}</S.Name>
            <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
          </S.NameBox>
          <S.Content>{data.text}</S.Content>
          <S.ContentButtonBox>
            {data.children.length >= 1 && (
              <S.ContentButton>{`대댓글 (${data.children.length}개)`}</S.ContentButton>
            )}
            <S.ContentButton>댓글 달기</S.ContentButton>
          </S.ContentButtonBox>
        </S.ContentWrapper>
      </S.Main>
      <S.IconWrapper>
        <S.IconButton>
          <HeartIcon size={15} color="#000" />
        </S.IconButton>
        {isLoginUser() && (
          <S.IconButton>
            <OptionIcon size={15} color="#000" />
          </S.IconButton>
        )}
      </S.IconWrapper>
    </S.Container>
  );
}
