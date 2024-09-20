import media from "@/styles/media";
import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  box-sizing: border-box;

  ${media.small`
    gap: 8px;
  `}
  ${media.mobile`
    gap: 6px;
  `}
`;
