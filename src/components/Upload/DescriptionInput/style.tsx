import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Textarea = styled.textarea`
  padding: 10px 0;
  height: auto;
  font-size: 18px;
  font-family: sans-serif;
  line-height: 1.5;
  border: none;

  outline: none;
  resize: none;
  overflow: hidden;

  ${media.mobile`
    padding: 8px 0;
    font-size: 15px;
    line-height: 1.3;
  `}
`;
