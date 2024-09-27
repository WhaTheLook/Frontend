import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  ${media.small`
    gap: 14px;
  `}
`;
