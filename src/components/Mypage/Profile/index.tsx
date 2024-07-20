import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./style";

export function Profile() {
  const [user, setUser] = useState({
    profile_image:
      "https://images.unsplash.com/photo-1721205834757-c69d5def190a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "홍길동",
  });

  const navigate = useNavigate();

  const handleEditBtnClick = () => {
    navigate("/profile/edit", { state: { user } });
  };

  return (
    <S.ProfileWrapper>
      <S.ProfileImageBox>
        <S.ProfileInfoDiv>
          <S.ProfileImage src={user.profile_image} />
          <S.ProfileTextBox>
            <S.UserName>{user.name}</S.UserName>
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
