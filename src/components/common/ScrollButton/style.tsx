import styled, { keyframes } from "styled-components";

const scaleUpAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.button`
  background-color: rgba(0, 0, 0, 0.8);

  border-radius: 10px;
  border: none;

  position: fixed;
  right: 20px;
  bottom: 20px;

  cursor: pointer;

  animation: ${scaleUpAnimation} 0.08s linear forwards;

  &:hover {
    background-color: #000;
  }
`;
