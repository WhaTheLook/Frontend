import styled from "styled-components";
import media from "@/styles/media";

export const Container = styled.div`
  background-color: #444444;
  padding: 16px;
  width: 96%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;

  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${media.small`
    width: auto;
    height: auto;
    padding: 12px 14px;

    position: absolute;
    bottom: 130%;
    transform: translateX(-50%);
    left: 50%;

    border-radius: 99px;
  `}
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;

  ${media.small`
    font-size: 14px;
  `}
  ${media.mobile`
    font-size: 13px;
  `}
`;
