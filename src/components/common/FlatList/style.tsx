import media from "@/styles/media";
import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  box-sizing: border-box;

  ${media.small`
    padding: 0 8px;
  `}
`;
