import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  width: 400px;
  padding: 35px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;

  border-radius: 12px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LogoText = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

export const Text = styled.span`
  margin-bottom: -15px;

  font-size: 20px;
  font-weight: 600;
`;

export const KakaoLoginButton = styled.div`
  width: 220px;
  height: 45px;
  background-image: url("./src/assets/imgs/kakao_login.png");
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 12px;
  cursor: pointer;
`;
