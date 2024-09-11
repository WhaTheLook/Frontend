import { styled } from "styled-components";

export const Container = styled.div`
  height: 150px;
  padding: 5px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
`;

export const TextWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  border-radius: 10px;

  cursor: pointer;
`;

export const Title = styled.span`
  width: 550px;
  max-height: 25px;

  font-size: 17px;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p`
  width: 580px;
  max-height: 25px;

  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Tag = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

export const InfoBox = styled.div`
  color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  gap: 5px;
`;

export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`;

export const UserProfile = styled.div`
  width: 25px;
  height: 25px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

export const UserName = styled.span`
  font-size: 12px;

  ${UserInfoBox}:hover & {
    text-decoration: underline;
  }
`;

export const DateText = styled.span`
  font-size: 12px;
`;

export const SubInfoBox = styled.div`
  margin-top: -3px;

  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SubInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SubInfoText = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ImageWrapper = styled.div`
  width: 140px;
  height: 140px;

  position: relative;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 8px;
`;

export const ImageCount = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 10px;

  font-size: 16px;
  color: #fff;

  border-radius: 99px;

  position: absolute;
  top: 4px;
  right: 4px;
`;
