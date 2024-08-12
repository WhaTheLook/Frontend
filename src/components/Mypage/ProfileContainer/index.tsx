import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserInfo } from "@/store/slice/myPageSlice";

import * as S from "./style";

export function ProfileContainer() {
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);

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
                게시글 <S.Bold>{userInfo?.postCount}</S.Bold>
              </S.InfoText>
              <S.InfoText>
                댓글 <S.Bold>{userInfo?.commentCount}</S.Bold>
              </S.InfoText>
            </S.InfoTextDiv>
          </S.ProfileTextBox>
        </S.ProfileInfoDiv>
        <S.EditButton onClick={handleEditBtnClick}>프로필 수정</S.EditButton>
      </S.ProfileImageBox>
    </S.ProfileWrapper>
  );
}
