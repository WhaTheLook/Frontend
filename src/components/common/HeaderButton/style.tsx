import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.button`
  background-color: #222222;
  padding: 8px 14px;

  display: flex;
  align-items: center;

  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #ffffff;

  border-radius: 99px;
  border: none;

  outline: none;
  cursor: pointer;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  ${media.mobile`
    padding: 6px 12px;
    font-size: 11px;
  `}
`;
