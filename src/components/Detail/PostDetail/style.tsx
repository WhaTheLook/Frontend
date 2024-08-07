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
    `;
  }}
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const PaddingFragment = styled.div`
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;
