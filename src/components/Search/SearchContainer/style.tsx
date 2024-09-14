import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 25px;

  ${media.small`
    gap: 22px;
  `}
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  ${media.small`
    gap: 8px;
  `}
`;

export const Text = styled.span`
  font-size: 20px;
  line-height: 140%;

  ${media.small`
    font-size: 18px;
  `}
`;

export const Bold = styled.span`
  font-weight: 600;
  margin-right: 2px;
`;
