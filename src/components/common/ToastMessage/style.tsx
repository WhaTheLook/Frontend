import styled, { css, keyframes } from "styled-components";

interface Props {
  $color: string;
  $bgColor?: string;
}

const scaleAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

export const Container = styled.div<Props>`
  ${({ $color, $bgColor }) => {
    return css`
      width: 300px;
      background-color: ${$bgColor};
      padding: 20px;

      display: flex;
      align-items: center;
      gap: 10px;

      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      position: relative;

      &::before {
        content: "";
        width: 100%;
        height: 4px;
        background-color: ${$color};

        position: absolute;
        left: 0;
        bottom: 0;

        transform-origin: left;
        animation: ${scaleAnimation} 3s linear forwards;
      }
    `;
  }}
`;

export const IconBox = styled.div<Props>`
  ${({ $color }) => {
    return css`
      background-color: ${$color};
      padding: 2px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 99px;
    `;
  }}
`;

export const Text = styled.span`
  font-size: 15px;
  line-height: 1.5;
`;
