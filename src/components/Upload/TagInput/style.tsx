import media from "@/styles/media";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  background-color: #f3f3f3;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 8px;

  position: relative;

  ${media.mobile`
    padding: 15px;
    gap: 15px;
  `}
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;

  ${media.mobile`
    gap: 12px;
  `}
`;

const scaleUp = keyframes`
    from {
        transform: scale(0.8);
    }
    to {
        transform: scale(1);
    }
`;

export const Tag = styled.div`
  background-color: #525252;
  padding: 9px 12px;

  font-size: 15px;
  color: #ffffff;
  white-space: nowrap;

  border-radius: 999px;

  cursor: pointer;

  animation: ${scaleUp} 0.1s ease-in;

  ${media.mobile`
    padding: 8px 10px;
    font-size: 12px;
  `}
`;

export const Input = styled.input`
  background-color: transparent;
  padding: 7px 0;

  font-size: 17px;

  border: none;

  outline: none;
`;

const translateIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const InfoTextBox = styled.div`
  width: 200px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 12px;

  position: absolute;
  top: 0;
  left: 103%;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  animation: ${translateIn} 0.3s ease-out;
`;

export const Bold = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const InfoText = styled.li`
  font-size: 15px;
  line-height: 1.5;

  margin: 7px 0;
  position: relative;
  padding-left: 12px;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    top: 0;
  }
`;
