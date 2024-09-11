import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 250px;

  border-radius: 8px;

  position: relative;

  cursor: pointer;
  transition: all 0.3s ease-out;

  &::before {
    content: "";

    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;

    border-radius: 8px;

    opacity: 0;
    transition: opacity 0.2s ease;

    position: absolute;
    top: 0;
    left: 0;

    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 8px;
  position: absolute;

  ${Container}:hover {
    width: 40%;
  }
`;

export const ImageCount = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 10px;

  display: flex;
  align-items: center;
  gap: 5px;

  border-radius: 99px;

  position: absolute;
  top: 8px;
  right: 7px;
`;

export const ImageCountSpan = styled.div`
  font-size: 16px;
  color: #fff;
`;

export const InfoWrapper = styled.div`
  height: 95%;
  padding: 0 15px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;

  opacity: 0;
  transition: opacity 0.2s ease;

  position: relative;
  z-index: 2;

  ${Container}:hover & {
    opacity: 1;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const Title = styled.span`
  width: 170px;

  display: block;

  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;
`;

export const InfoTextBox = styled.div`
  display: flex;
  gap: 4px;

  color: rgba(255, 255, 255, 0.55);
`;

export const Writter = styled.span`
  max-width: 100px;

  display: block;

  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.55);

  overflow: hidden;
`;

export const Date = styled.span`
  display: block;

  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
`;

export const SubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const HeartCount = styled.span`
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
`;
