import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { OptionIcon } from "@/components/Icons/OptionIcon";

import { modalLocationType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useModalContext } from "@/hooks/contexts/useModalContext";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

export function ProfileBox() {
  const { data } = useDetailContext();
  const { author } = data;
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
          <OptionIcon size={ICON_SIZE.SMALL} color="#000" />
        </S.OptionButton>
      )}
    </S.Container>
  );
}
