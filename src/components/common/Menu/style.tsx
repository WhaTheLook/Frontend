import { styled, css } from "styled-components";

export const Container = styled.nav`
  background-color: #ffffff;
  width: 100%;
  margin-top: -20px;
  padding-top: 30px;

  border-bottom: 1.5px solid #eaebec;

  position: sticky;
  top: 0px;

  z-index: 10;
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
`;

export const Text = styled.span<TextProps>`
  ${({ $isSelected }) => {
    return css`
      font-size: 18px;
      font-weight: ${$isSelected && "600"};
      color: ${!$isSelected && "rgba(0, 0, 0, 0.3)"};
      white-space: nowrap;

      user-select: none;
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
