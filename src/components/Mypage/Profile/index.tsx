import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserInfoType } from "@/types";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

export function Profile() {
  const userInfo = useSelector(selectCurrentUser) as UserInfoType | null;

  const navigate = useNavigate();

  const handleEditBtnClick = () => {
    navigate("/profile/edit");
  };

  return (
    <S.ProfileWrapper>
      <S.ProfileImageBox>
        <S.ProfileInfoDiv>
          <S.ProfileImage src={userInfo?.profileImage} />
          <S.ProfileTextBox>
            <S.UserName>{userInfo?.name}</S.UserName>
            <S.InfoTextDiv>
              <S.InfoText>
                게시글 <S.Bold>1</S.Bold>
              </S.InfoText>
              <S.InfoText>
                댓글 <S.Bold>4</S.Bold>
              </S.InfoText>
            </S.InfoTextDiv>
          </S.ProfileTextBox>
        </S.ProfileInfoDiv>
        <S.EditButton onClick={handleEditBtnClick}>프로필 수정</S.EditButton>
      </S.ProfileImageBox>
    </S.ProfileWrapper>
  );
}
