import styled from "styled-components";

export const CommentBox = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextInput = styled.textarea`
  width: 100%;
  padding: 8px;

  font-size: 14px;
  color: #000000;

  resize: none;

  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);

  &:focus {
    border-bottom: 1.5px solid #000000;
  }
`;

export const SubmitButton = styled.button`
  background-color: #000000;
  width: 50px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;

  cursor: pointer;
`;
