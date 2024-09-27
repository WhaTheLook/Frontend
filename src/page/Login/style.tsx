import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  padding: 50px 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  ${media.mobile`
    gap: 14px;
  `}
`;

export const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
  white-space: nowrap;

  ${media.mobile`
    font-size: 18px;
  `}
`;

export const InfoText = styled.p`
  font-size: 16px;
  white-space: nowrap;

  ${media.mobile`
    font-size: 14px;
  `}
`;
