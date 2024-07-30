import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const skeletonGradient = keyframes`
    0% {
        background-color: #f2f2f2;
    }
    50% {
        background-color: rgba(242, 242, 242, 0.4);
    }
    100% {
        background-color: #f2f2f2;
    }
`;

export const GridItemSkeleton = styled.div`
  background-color: #f2f2f2;
  width: 240px;
  height: 240px;

  border-radius: 8px;

  animation: ${skeletonGradient} 1.4s ease-in infinite;
`;
