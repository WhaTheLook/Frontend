import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 20px 150px 20px;

  display: flex;
  gap: 50px;
`;

export const Main = styled.main`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 50px;
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

export const SubmitButton = styled.input`
  display: none;
`;

export const AccountDeleteDiv = styled.div`
  border-radius: 10px;
  cursor: pointer;
`;

export const AccountDeleteText = styled.span`
  white-space: nowrap;
  font-size: 16px;
  color: #828282;

  &:hover {
    text-decoration: underline;
  }
`;
