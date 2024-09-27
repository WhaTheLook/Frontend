import media from "@/styles/media";
import styled from "styled-components";

export const Date = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: -8px;
`;

export const ContentBox = styled.div`
  width: 100%;
  padding: 20px 15px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  box-sizing: border-box;

  ${media.small`
    padding: 6px 15px;
    gap: 15px;
  `}
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
  white-space: pre-wrap;
  line-height: 120%;
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
