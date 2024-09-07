import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #2d3436;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;

  box-sizing: border-box;
`;

export const Text = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const RetryButton = styled.button`
  background: #636e72;
  padding: 10px;

  font-size: 14px;
  font-weight: 600;
  color: #fff;

  border: none;
  border-radius: 8px;

  cursor: pointer;
`;
