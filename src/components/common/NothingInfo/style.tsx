import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  padding: 80px 0;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  ${media.small`
    gap: 22px;
  `}
`;

export const Text = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #b2b2b2;

  ${media.small`
    font-size: 15px;
  `}
`;
