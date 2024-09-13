import media from "@/styles/media";
import { css, styled } from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 0 20px;

  display: flex;
  gap: 50px;

  position: relative;

  ${media.small`
    padding: 0;
  `}
`;

interface MainProps {
  $isCenter: boolean;
}

export const Main = styled.main<MainProps>`
  ${({ $isCenter }) => {
    return css`
      width: 100%;
      margin-top: 20px;
      padding-bottom: 80px;

      display: flex;
      justify-content: ${$isCenter ? "center" : "baseline"};
    `;
  }}
`;
