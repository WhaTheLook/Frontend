import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  ${media.small`
    padding-top: 10px;
    padding-bottom: 10px;
    
    border: none;
  `}
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
  padding: 5px;

  display: flex;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 50%;

  ${media.small`
    width: 24px;
    height: 24px;
  `}
`;

export const Writter = styled.span`
  font-size: 15px;
  font-weight: 600;

  ${media.small`
    font-size: 13px;
  `}
`;
