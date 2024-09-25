import media from "@/styles/media";
import styled, { css } from "styled-components";

interface ContainerProps {
  $isModal: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ $isModal }) => {
    return css`
      background-color: #ffffff;
      width: 1000px;
      height: 540px;

      display: flex;
      align-items: center;

      border-radius: 12px;
      border: 1px solid ${!$isModal ? "transparnet" : "rgba(0, 0, 0, 0.13)"};

      ${media.small`
        width: ${!$isModal ? "90%" : "100%"};
        height: ${!$isModal ? "" : "100%"};
        flex-direction: column;
      `}
    `;
  }}
`;
