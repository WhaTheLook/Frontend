import styled from "styled-components";

export const Container = styled.li`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Main = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 50%;
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  padding-top: 7px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const Content = styled.p`
  font-size: 14px;
`;

export const ContentButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContentButton = styled.button`
  background-color: transparent;
  padding: 0;

  font-size: 12px;
  color: #a2a2a2;

  border: none;

  cursor: pointer;
`;

export const IconWrapper = styled.div`
  padding-top: 7px;

  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const IconButton = styled.button`
  background-color: transparent;
  padding: 0;

  border: none;

  cursor: pointer;
`;
