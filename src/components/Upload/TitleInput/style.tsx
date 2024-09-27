import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  font-size: 25px;
  font-weight: 700;
  line-height: 1.5;

  border: none;

  outline: none;

  ${media.mobile`
    font-size: 20px;
  `}
`;
