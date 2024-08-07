import styled, { css, keyframes } from "styled-components";

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

interface ContainerProps {
  color: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div<ContainerProps>`
  ${({ color }) => {
    return css`
      width: 30px;
      height: 30px;

      display: inline-block;

      border: 5px solid ${color};
      border-bottom-color: transparent;
      border-radius: 50%;

      box-sizing: border-box;
      animation: ${rotation} 0.8s linear infinite;
    `;
  }}
`;
