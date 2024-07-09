import styled from "styled-components";

export const Container = styled.div`
  width: 343px;
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border-radius: 8px;
  background: #ffffff;
`;

export const TextWrapper = styled.div`
  height: 66px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.span`
  font-size: 18px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const CancleButton = styled.button`
  padding: 10px 14px;
  text-align: center;
  font-size: 18px;

  border-radius: 8px;
  border: none;

  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  padding: 10px 14px;

  text-align: center;
  font-size: 18px;

  border-radius: 8px;
  border: none;

  cursor: pointer;
`;
