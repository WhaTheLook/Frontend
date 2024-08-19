import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const Title = styled.div`
  margin-top: 10px;

  font-size: 22px;
  font-weight: 600;
`;

export const Text = styled.span`
  font-size: 15px;
  color: #a0a0a0;
`;

export const Button = styled.span`
  background-color: #222222;
  padding: 15px 45px;
  margin-top: 15px;

  font-size: 16px;
  font-weight: 600;
  color: #fff;

  border: none;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
