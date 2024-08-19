import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

export const ProfileImageDiv = styled.div``;

export const OptionButton = styled.button`
  background-color: transparent;

  border: none;

  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 50%;
`;

export const Writter = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
