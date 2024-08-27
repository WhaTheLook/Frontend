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

  border-top: 1px solid rgba(0, 0, 0, 0.2);

  box-sizing: border-box;
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
