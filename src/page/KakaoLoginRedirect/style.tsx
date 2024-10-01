import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;

  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MessageTitle = styled.h5`
  font-size: 20px;
`;

export const Message = styled.span`
  font-size: 17px;
`;

export const Button = styled.button`
  background-color: #333333;
  padding: 10px;

  font-size: 16px;
  color: #fff;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: rgba(51, 51, 51, 0.9);
  }
`;
