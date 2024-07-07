import { styled } from "styled-components";

export const Container = styled.nav`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  border-bottom: 1.5px solid #eaebec;

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
  font-size: 18px;
  font-weight: ${({ $isSelected }) => $isSelected && "600"};
  color: ${({ $isSelected }) => !$isSelected && "rgba(0, 0, 0, 0.3)"};
`;

interface TabLineProps {
  offset: number;
  width: number;
}

export const TabLine = styled.div<TabLineProps>`
  background-color: #000000;
  width: ${({ width }) => `${width}px`};
  height: 2px;

  border-radius: 999px;

  position: absolute;
  bottom: -1px;

  transform: ${({ offset }) => `translateX(${offset}px)`};
  transition: all 0.3s ease-out;
`;
