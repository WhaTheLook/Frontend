import media from "@/styles/media";
import { styled } from "styled-components";

export const Container = styled.div`
  height: 150px;
  padding: 5px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;

  ${media.small`
    height: 130px;
    padding: 4px 0px;
  `}
`;

export const TextWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  ${media.small`
    gap: 12px;
  `}
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  border-radius: 10px;

  cursor: pointer;

  ${media.small`
    gap: 12px;
  `}
`;

export const Title = styled.span`
  width: 550px;
  max-height: 25px;

  font-size: 17px;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.small`
    max-height: 22px;
    width: 380px;
    font-size: 16px;
  `}
`;

export const Description = styled.p`
  width: 580px;
  max-height: 25px;

  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.small`
    width: 380px;
    font-size: 14px;
  `}
`;

export const TagsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  ${media.small`
    gap: 10px;
  `}
`;

export const Tag = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);

  ${media.small`
    font-size: 12px;
  `}
`;

export const InfoBox = styled.div`
  color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  gap: 5px;

  ${media.small`
    gap: 4px;
  `}
`;

export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;

  ${media.small`
    gap: 4px;
  `}
`;

export const UserProfile = styled.div`
  width: 25px;
  height: 25px;

  ${media.small`
    width: 22px;
    height: 22px;
  `}
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

  ${media.small`
    font-size: 11px;    
  `}
`;

export const DateText = styled.span`
  font-size: 12px;

  ${media.small`
    font-size: 11px;    
  `}
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

  ${media.small`
    gap: 4px;
  `}
`;

export const SubInfoText = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);

  ${media.small`
    font-size: 11px;    
  `}
`;

export const ImageWrapper = styled.div`
  width: 140px;
  height: 140px;

  position: relative;

  ${media.small`
    width: 125px;
    height: 125px;
  `}
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
