import media from "@/styles/media";
import styled from "styled-components";

export const Button = styled.button`
  width: 220px;
  height: 45px;
  background-image: url("/imgs/kakao_login.png");
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border: none;
  border-radius: 12px;
  cursor: pointer;

  ${media.mobile`
    width: 200px;
    height: 40px;
  `}
`;
