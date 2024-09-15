import styled from "styled-components";

export const Container = styled.ul`
  width: 100%;
  padding-left: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  box-sizing: border-box;
`;

export const ViewMoreButton = styled.button`
  background-color: transparent;
  padding: 0;

  font-size: 13px;
  font-weight: 600;
  color: #a2a2a2;

  border: none;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
