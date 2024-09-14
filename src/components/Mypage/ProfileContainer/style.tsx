import media from "@/styles/media";
import styled from "styled-components";

export const ProfileWrapper = styled.div`
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  ${media.small`
    gap: 35px;
  `}
`;

export const ProfileImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProfileImage = styled.img`
  width: 140px;
  height: 140px;

  border-radius: 50%;

  ${media.small`
    width: 110px;
    height: 110px;
  `}
`;

export const ProfileInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;

  ${media.small`
    gap: 20px;
  `}
`;

export const EditButton = styled.button`
  background-color: transparent;
  padding: 10px 12px;

  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  border: 1.4px solid #000;
  border-radius: 8px;

  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  ${media.small`
    padding: 8px 10px;
    font-size: 13px;
  `}
`;

export const ProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;

  ${media.small`
    gap: 18px;
  `}
`;

export const UserName = styled.h3`
  font-size: 26px;
  font-weight: 600;

  ${media.small`
    font-size: 22px;
  `}
`;

export const InfoTextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  ${media.small`
    gap: 12px;
  `}
`;

export const InfoText = styled.span`
  font-size: 16px;
  white-space: nowrap;

  ${media.small`
    font-size: 14px;
  `}
`;

export const Bold = styled.b`
  font-weight: 600;
`;
