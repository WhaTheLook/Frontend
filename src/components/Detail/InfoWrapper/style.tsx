import styled from "styled-components";

export const ProfileBox = styled.div`
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
`;

export const ProfileImageDiv = styled.div``;

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 50%;
`;

export const Writter = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const Date = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ContentBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 17px;
  font-weight: 600;
  line-height: 130%;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.8);

  word-wrap: break-word;
`;

export const Tags = styled.div`
  max-width: 350px;

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Tag = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  white-space: nowrap;

  cursor: pointer;
`;

export const SubInfoBox = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;
