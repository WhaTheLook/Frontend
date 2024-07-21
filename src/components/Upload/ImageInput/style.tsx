import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  background-color: transparent;
  width: 100px;
  height: 100px;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  cursor: pointer;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  color: #828282;

  user-select: none;
`;

interface SampleImageProps {
  $imageUrl: string;
}

export const SamleImage = styled.div<SampleImageProps>`
  ${({ $imageUrl }) => {
    return css`
      background: url(${$imageUrl});
      background-size: cover;
      background-position: center;
      width: 100px;
      height: 100px;

      border-radius: 8px;

      position: relative;
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
