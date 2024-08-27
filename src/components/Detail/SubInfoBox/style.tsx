import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IconInfoText = styled.span`
  font-size: 14px;
  user-select: none;
`;

export const IconDiv = styled.div`
  cursor: pointer;
`;
