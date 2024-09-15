import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Wrapper = styled.li`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Main = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 50%;
`;

export const NameBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

export const Date = styled.span`
  font-size: 12px;
  color: #a2a2a2;
`;

export const ContentWrapper = styled.div`
  padding-top: 4px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TargetUser = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #a2a2a2;
`;

export const Content = styled.p`
  display: flex;
  align-items: center;
  gap: 7px;

  font-size: 13px;
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
  gap: 4px;

  position: relative;
`;

export const IconButton = styled.button`
  background-color: transparent;
  padding: 5px;

  display: flex;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Menu = styled.div`
  padding: 2px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  position: absolute;
  right: 120%;
  top: 70%;
`;

export const MenuButton = styled.button`
  background-color: #ffffff;
  width: 100%;
  padding: 6px 22px;

  font-size: 12px;
  white-space: nowrap;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;

  z-index: 99;
  &:hover {
    background-color: #f2f2f2;
  }
`;
