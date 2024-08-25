import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { OptionButton } from "@/components/Icons/OptionIcon";

import { UserInfoType } from "@/types";
import { modalLocationType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useModalContext } from "@/hooks/useModalContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  author: UserInfoType;
}

export function ProfileBox({ author }: Props) {
  const navigate = useNavigate();
  const loginUser = useSelector(selectCurrentUser);

  const { handleOpen } = useModalContext();

  const isOwnLoginUser = author.kakaoId === loginUser?.kakaoId;

  const handleUserProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <S.Container>
      <S.Profile onClick={() => handleUserProfileClick(author.kakaoId)}>
        <S.ProfileImageDiv>
          <S.ProfileImage src={author.profileImage} />
        </S.ProfileImageDiv>
        <S.Writter>{author.name}</S.Writter>
      </S.Profile>
      {isOwnLoginUser && (
        <S.OptionButton onClick={() => handleOpen(modalLocationType.DETAIL)}>
          <OptionButton size={ICON_SIZE.SMALL} color="#000" />
        </S.OptionButton>
      )}
    </S.Container>
  );
}
