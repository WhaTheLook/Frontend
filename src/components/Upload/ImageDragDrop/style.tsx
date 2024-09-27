import media from "@/styles/media";
import styled, { css } from "styled-components";

export const DragBox = styled.div`
  display: flex;
  align-items: center;
`;

interface SampleImageProps {
  $imageUrl: string;
}

export const SampleImage = styled.div<SampleImageProps>`
  ${({ $imageUrl }) => {
    return css`
      margin: 0 5px;
      background: url(${$imageUrl});
      background-size: cover;
      background-position: center;
      width: 100px;
      height: 100px;

      border-radius: 8px;

      position: relative;

      ${media.mobile`
        width: 50px;
        height: 50px;
      `}
    `;
  }}
`;

export const DeleteButton = styled.div`
  background-color: #020202;

  display: flex;

  position: absolute;
  top: -7px;
  right: -7px;

  border-radius: 999px;

  cursor: pointer;
`;

export const ThumnailBox = styled.div`
  background-color: #020202;
  width: inherit;
  padding: 6px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  position: absolute;
  bottom: 0;

  ${media.mobile`
    padding: 4px 0;
  `}
`;

export const ThumnailText = styled.span`
  font-size: 12px;
  color: #fff;

  ${media.mobile`
    font-size: 7px;
  `}
`;
