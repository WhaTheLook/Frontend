import styled, { css } from "styled-components";

interface EditFormProps {
  $isEdit: boolean;
}

export const EditForm = styled.form<EditFormProps>`
  ${({ $isEdit }) => {
    return css`
      width: 100%;
      padding-left: ${$isEdit ? "0" : "35px"};

      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;

      box-sizing: border-box;
    `;
  }}
`;

export const EditTextArea = styled.textarea`
  width: 100%;

  font-size: 13px;
  color: #000000;
  font-family: sans-serif;

  border: none;
  border-bottom: 2px solid #525252;
  resize: none;
  outline: none;
`;

export const EditButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const EditButtonBase = styled.button`
  padding: 6px 10px;

  font-size: 13px;

  border: none;
  border-radius: 99px;

  cursor: pointer;
`;

export const EditCancleBtn = styled(EditButtonBase)`
  background-color: #e2e2e2;

  color: #000000;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const EditConfirmBtn = styled(EditButtonBase)`
  background-color: #222222;

  color: #ffffff;

  &:hover {
    background-color: #525252;
  }

  &:disabled {
    background-color: #a2a2a2;
  }
`;
