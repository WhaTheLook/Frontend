import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
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
    `;
  }}
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.span`
  font-size: 13px;

  user-select: none;
`;

export const Bold = styled.b`
  font-weight: 600;
  font-size: 16px;
`;
