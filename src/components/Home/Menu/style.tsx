import { styled } from "styled-components";

export const Container = styled.nav`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Box = styled.div<TextProps>`
  width: 100%;
  padding: 10px 0;

  position: relative;

  display: flex;
  justify-content: center;

  cursor: pointer;

  &::after {
    content: "";

    background-color: ${({ $isSelected }) =>
      $isSelected ? "#000000" : "rgba(0, 0, 0, 0.2)"};
    width: 100%;
    height: 3px;

    position: absolute;
    bottom: -3px;
  }
`;

interface TextProps {
  $isSelected: boolean;
}

export const Text = styled.span<TextProps>`
  font-size: 18px;
  font-weight: ${({ $isSelected }) => $isSelected && "600"};
  color: ${({ $isSelected }) => !$isSelected && "rgba(0, 0, 0, 0.2)"};
`;
