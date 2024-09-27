import media from "@/styles/media";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  ${media.small`
    gap: 8px;
  `}
  ${media.mobile`
    gap: 6px;
  `}
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
  width: 100%;
  aspect-ratio: 1 / 1;

  border-radius: 8px;

  animation: ${skeletonGradient} 1.4s ease-in infinite;
`;
