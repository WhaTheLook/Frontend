import media from "@/styles/media";
import styled, { css } from "styled-components";

export const Container = styled.div`
  background-color: #000000;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;

  position: relative;

  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  overflow: hidden;

  ${media.small`
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: fit-content;

  user-select: none;
`;

const BaseButton = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;

  display: flex;

  border-radius: 50%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;

  user-select: none;
`;

export const NextButton = styled(BaseButton)`
  right: 10px;
`;

export const PrevButton = styled(BaseButton)`
  left: 10px;
`;

export const OrderBox = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 7px 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 999px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 14px;
`;

interface OrderProps {
  $isCurrent: boolean;
}

export const Order = styled.div<OrderProps>`
  ${({ $isCurrent }) => {
    return css`
      background-color: ${$isCurrent ? "#000000" : "#FFFFFF"};
      width: 8px;
      height: 8px;

      border-radius: 50%;

      cursor: pointer;
    `;
  }}
`;
