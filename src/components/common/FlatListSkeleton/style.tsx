import media from "@/styles/media";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
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

const BaseElement = styled.div`
  background-color: #f2f2f2;

  border-radius: 6px;

  animation: ${skeletonGradient} 1.4s ease-in infinite;
`;

export const Wrapper = styled.div`
  height: 150px;
  padding: 5px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.small`
    height: 130px;
    padding: 4px 0px;
  `}
`;

export const TextWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;

  ${media.small`
    gap: 7px;
  `}
`;

export const Title = styled(BaseElement)`
  width: 300px;
  height: 24px;

  ${media.small`
    width: 250px;
    height: 20px;
  `}
`;

export const Description = styled(BaseElement)`
  width: 350px;
  height: 24px;

  ${media.small`
    width: 300px;
    height: 20px;
  `}
`;

export const TagsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${media.small`
    gap: 6px;
  `}
`;

export const Tag = styled(BaseElement)`
  width: 70px;
  height: 22px;

  ${media.small`
    width: 55px;
    height: 20px;
  `}
`;

export const InfoBox = styled(BaseElement)`
  width: 110px;
  height: 22px;

  display: flex;
  align-items: center;
  gap: 5px;

  ${media.small`
    width: 100px;
    height: 20px;
  `}
`;

export const ImageWrapper = styled(BaseElement)`
  width: 140px;
  height: 140px;

  border-radius: 8px;

  ${media.small`
    width: 125px;
    height: 125px;
  `}
`;
