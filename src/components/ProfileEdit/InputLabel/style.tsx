import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;

  user-select: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 10px;

  font-size: 16px;

  border: 1px solid #c2c2c2;
  border-radius: 6px;

  outline: none;
`;
