import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";

import * as S from "./style";

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("홍길동");

  return (
    <S.Container>
      <S.Wrapper>
        <Link to="/">
          <S.TitleBox>
            <Logo />
            <S.Title>WHATHELOOK</S.Title>
          </S.TitleBox>
        </Link>
        <S.InfoBox>
          {isLogin ? (
            <S.LoginMessage>
              <S.UserName>{userName}</S.UserName>님 안녕하세요!
            </S.LoginMessage>
          ) : (
            <S.LoginButton>로그인</S.LoginButton>
          )}
        </S.InfoBox>
      </S.Wrapper>
    </S.Container>
  );
}
