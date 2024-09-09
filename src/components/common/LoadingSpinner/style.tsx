import styled, { css, keyframes } from "styled-components";

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
interface ConatianerProps {
  $isNoPadding: boolean;
}

export const Container = styled.div<ConatianerProps>`
  ${({ $isNoPadding }) => {
    return css`
      width: 100%;
      // height: 100%;
      padding: ${$isNoPadding ? "0" : "40px"} 0;

      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }}
`;

interface BoxProps {
  color: string;
}

export const Box = styled.div<BoxProps>`
  ${({ color }) => {
    return css`
      width: 25px;
      height: 25px;

      display: inline-block;

      border: 4px solid ${color};
      border-bottom-color: transparent;
      border-radius: 50%;

      box-sizing: border-box;
      animation: ${rotation} 0.8s linear infinite;
    `;
  }}
`;
