import media from "@/styles/media";
import { styled, css } from "styled-components";

export const Container = styled.nav`
  background-color: #ffffff;
  width: 100%;
  margin-top: -20px;
  margin-bottom: 15px;
  padding-top: 30px;

  border-bottom: 1.5px solid #eaebec;

  position: sticky;
  top: 0px;

  z-index: 10;

  ${media.mobile`
    padding-top: 20px;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  position: relative;
`;

interface TextProps {
  $isSelected: boolean;
}

export const Box = styled.div<TextProps>`
  width: fit-content;
  padding: 0 15px;
  padding-bottom: 15px;

  position: relative;

  display: flex;
  justify-content: center;

  cursor: pointer;

  ${media.mobile`
    padding-bottom: 10px;
  `}
`;

export const Text = styled.span<TextProps>`
  ${({ $isSelected }) => {
    return css`
      font-size: 18px;
      font-weight: ${$isSelected && "600"};
      color: ${!$isSelected && "rgba(0, 0, 0, 0.3)"};
      white-space: nowrap;

      user-select: none;

      ${media.small`
        font-size: 16px;
      `}
      ${media.mobile`
        font-size: 14px;
      `}
    `;
  }}
`;

interface TabLineProps {
  offset: number;
  width: number;
}

export const TabLine = styled.div<TabLineProps>`
  ${({ width, offset }) => {
    return css`
      background-color: #000000;
      width: ${width}px;
      height: 2px;

      border-radius: 999px;

      position: absolute;
      bottom: -1px;

      transform: translateX(${offset}px);
      transition: all 0.3s ease-out;
    `;
  }}
`;
