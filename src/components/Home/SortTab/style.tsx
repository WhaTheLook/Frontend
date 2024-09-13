import media from "@/styles/media";
import { styled, css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 18px 0;

  ${media.small`
    padding: 0 8px;
    box-sizing: border-box;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface ButtonProps {
  $isSelected: boolean;
}

export const Button = styled.button<ButtonProps>`
  ${({ $isSelected }) => {
    return css`
      background-color: ${$isSelected ? "#2d3436" : "transparent"};
      padding: 5px 15px;

      font-size: 15px;
      font-weight: ${$isSelected && "700"};
      color: ${$isSelected ? "#FFFFFF" : "#000000"};
      white-space: nowrap;

      outline: none;
      border: 1.4px solid transparent;
      border-radius: 999px;

      cursor: pointer;
      user-select: none;

      &:hover {
        border: 1.4px solid rgba(0, 0, 0, 0.1);
      }
    `;
  }}
`;
