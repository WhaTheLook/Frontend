import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const LabelBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;

  user-select: none;
`;

export const InfoText = styled.span`
  font-size: 15px;
  color: #828282;

  user-select: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;

  font-size: 16px;

  border: 1px solid #c2c2c2;
  border-radius: 6px;

  outline: none;
  box-sizing: border-box;
`;
