import media from "@/styles/media";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${media.mobile`
    gap: 12px;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  ${media.mobile`
    gap: 12px;
  `}
`;

interface TypeBoxProps {
  $isSelected: boolean;
}

export const TypeBox = styled.div<TypeBoxProps>`
  ${({ $isSelected }) => {
    return css`
      padding: 15px 0;
      width: 100%;

      border-radius: 10px;
      border: 1.5px solid ${$isSelected ? "#3498db" : "rgba(0, 0, 0, 0.2)"};

      cursor: pointer;

      ${media.mobile`
        padding: 12px 0;
        border: 1.2px solid ${$isSelected ? "#3498db" : "rgba(0, 0, 0, 0.2)"};
      `}
    `;
  }}
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  ${media.mobile`
    gap: 8px;
  `}
`;

export const Text = styled.span`
  font-size: 13px;

  user-select: none;

  ${media.mobile`
    font-size: 11px;
  `}
`;

export const Bold = styled.b`
  font-weight: 600;
  font-size: 16px;

  ${media.mobile`
    font-size: 14px;
  `}
`;
