import styled from "styled-components";

export const Container = styled.div`
  background-color: #444444;
  padding: 16px;
  width: 96%;

  display: flex;
  justify-content: center;

  border-radius: 12px;

  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
`;
