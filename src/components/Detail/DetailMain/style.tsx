import media from "@/styles/media";
import styled, { css } from "styled-components";

interface ContainerProps {
  $isModal: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ $isModal }) => {
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;

      ${media.small`
        height: ${$isModal ? "100%" : "40%"};
      `}
    `;
  }}
`;
