import media from "@/styles/media";
import styled, { css } from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: inherit;
  min-height: 85px;

  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  position: absolute;
  top: 100%;

  z-index: 99;
`;

export const Wrapper = styled.div`
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InfoTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoText = styled.span`
  font-size: 16px;

  ${media.small`
    font-size: 14px;
  `}
  ${media.mobile`
    font-size: 12px;
  `}
`;

export const InfoSubTextDiv = styled.div`
  font-size: 13px;

  display: flex;
  align-items: center;
  gap: 5px;

  ${media.small`
    gap: 3px;
    font-size: 12px;
  `}
  ${media.mobile`
    gap: 2px;
    font-size: 10px;
  `}
`;

interface SubButtonProps {
  $isDisabled: boolean;
}

export const SubButton = styled.button<SubButtonProps>`
  ${({ $isDisabled }) => {
    return css`
      background-color: transparent;

      font-size: 13px;
      letter-spacing: -0.2px;

      border: none;

      cursor: ${$isDisabled ? "default" : "pointer"};

      &:hover {
        text-decoration: ${$isDisabled ? "" : "underline"};
      }

      ${media.small`
        font-size: 12px;
      `}
      ${media.mobile`
        font-size: 10px;
      `}
    `;
  }}
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  ${media.mobile`
    gap: 8px;
  `}
`;

export const Tag = styled.div`
  background-color: #f2f2f2;
  padding: 2px 7px 2px 15px;

  display: flex;
  align-items: center;
  gap: 5px;

  border-radius: 99px;

  ${media.mobile`
    padding: 1px 5px 1px 10px;
    gap: 3px;
  `}
`;

export const Text = styled.span`
  font-size: 15px;
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${media.small`
    font-size: 13px;
  `}
  ${media.mobile`
    font-size: 12px;
  `}
`;

export const XButton = styled.button`
  background-color: transparent;
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  cursor: pointer;
`;

export const MainText = styled.span`
  text-align: center;
  font-size: 16px;
  color: #a9a9a9;

  ${media.small`
    font-size: 14px;
  `}
  ${media.mobile`
    font-size: 12px;
  `}
`;
