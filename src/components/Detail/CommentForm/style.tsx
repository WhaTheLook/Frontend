import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextInput = styled.textarea`
  width: 100%;

  font-size: 14px;
  color: #000000;
  font-family: sans-serif;

  resize: none;

  border: none;
  outline: none;
`;

export const SubmitButton = styled.button`
  background-color: #000000;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;

  cursor: pointer;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
