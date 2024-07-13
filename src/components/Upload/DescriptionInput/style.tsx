import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Textarea = styled.textarea`
  padding: 12px 14px;

  font-size: 18px;
  font-family: sans-serif;

  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  outline: none;
  resize: none;
`;
