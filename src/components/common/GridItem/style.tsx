import { styled, css } from "styled-components";

interface ContainerProps {
  $imageUrl: string;
}

export const Container = styled.div<ContainerProps>`
  ${({ $imageUrl }) => {
    return css`
      width: 240px;
      height: 240px;
      background-image: url(${$imageUrl});
      background-size: 100%;
      background-position: center;

      border-radius: 8px;

      cursor: pointer;
      transition: all 0.3s ease-out;

      &:hover {
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.6)
          ),
          url(${$imageUrl});
        background-size: 110%;
      }
    `;
  }}
`;

export const InfoWrapper = styled.div`
  height: 95%;
  padding: 0 15px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;

  opacity: 0;
  transition: opacity 0.3s ease;

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
