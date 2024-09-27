import media from "@/styles/media";
import styled from "styled-components";

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;

  ${media.mobile`
    font-size: 15px;
  `}
`;
