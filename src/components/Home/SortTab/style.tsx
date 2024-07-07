import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 18px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Button = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#2d3436" : "transparent"};
  padding: 6px 16px;

  font-size: 15px;
  font-weight: ${({ $isSelected }) => $isSelected && "700"};
  color: ${({ $isSelected }) => ($isSelected ? "#FFFFFF" : "#000000")};

  outline: none;
  border: none;
  border-radius: 999px;

  cursor: pointer;
`;
