import media from "@/styles/media";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 55px;
  margin-bottom: 30px;

  position: relative;

  ${media.small`
    height: 50px;
  `}
`;

interface FormProps {
  $isFocus: boolean;
}

export const Form = styled.form<FormProps>`
  ${({ $isFocus }) => {
    return css`
      width: 100%;
      height: 100%;

      position: relative;

      border-radius: 12px;
      border-bottom-left-radius: ${$isFocus ? "0px" : "12px"};
      border-bottom-right-radius: ${$isFocus ? "0px" : "12px"};
      border: 1px solid rgba(0, 0, 0, 0.2);
    `;
  }}
`;

export const InputBox = styled.div`
  height: 100%;
  padding: 0px 50px;
`;

export const InputText = styled.input`
  width: 100%;
  height: 100%;
  padding: 0px;

  font-size: 22px;
  font-weight: 600;
  color: #404040;

  border: none;

  outline: none;

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  ${media.small`
    font-size: 20px;
  `}
`;

export const BaseButton = styled.button`
  background: transparent;

  border: none;

  position: absolute;
  top: 52%;
  transform: translateY(-50%);

  outline: none;
  cursor: pointer;
`;

export const SubmitButton = styled(BaseButton)`
  left: 10px;
`;

export const ResetButton = styled(BaseButton)`
  background-color: #828282;
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 99px;

  right: 15px;
`;
