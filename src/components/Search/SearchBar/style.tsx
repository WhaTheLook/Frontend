import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 55px;

  border-radius: 10px;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;

  position: relative;
`;

export const InputBox = styled.div`
  height: 100%;
  padding: 0px 50px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
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
