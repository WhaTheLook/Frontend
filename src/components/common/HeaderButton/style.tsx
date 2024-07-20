import styled from "styled-components";

export const Container = styled.button`
  background-color: #222222;
  padding: 8px 14px;

  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  border-radius: 99px;
  border: none;

  outline: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
