import { styled } from "styled-components";

export const Container = styled.div`
  height: 150px;
  padding: 5px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;

  cursor: pointer;
`;

export const TextWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
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

export const InfoBoxText = styled.span`
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
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 8px;
`;
