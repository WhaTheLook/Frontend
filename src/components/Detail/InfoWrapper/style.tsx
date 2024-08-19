import styled from "styled-components";

export const Date = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: -8px;
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
  user-select: none;
`;

export const IconDiv = styled.div`
  cursor: pointer;
`;
