import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fff5f5;
  padding: 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #fedad9;
  border-radius: 10px;

  box-sizing: border-box;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Text = styled.span`
  color: #000;
  font-size: 15px;
`;

export const RetryButton = styled.button`
  background-color: #0d0d0d;
  padding: 11px 22px;

  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 14px;
  font-weight: 600;
  color: #fff;

  border: none;
  border-radius: 99px;

  cursor: pointer;
`;
