import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const UploadInput = styled.input`
  display: none;
`;

interface UploadBox {
  $previewImage: string;
}

export const UploadBox = styled.div<UploadBox>`
  ${({ $previewImage }) => {
    return css`
      background: url(${$previewImage});
      background-size: cover;
      background-position: center;
      width: 120px;
      height: 120px;

      border-radius: 50%;

      position: relative;

      cursor: pointer;
    `;
  }}
`;

export const Icon = styled.div`
  background-color: #000;
  padding: 4px;

  display: flex;

  border-radius: 50%;
  border: 3px solid #fff;

  position: absolute;
  bottom: 3px;
  right: 3px;
`;

export const Menu = styled.div`
  width: 150px;
  padding: 6px 4px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  position: absolute;
  left: 115%;
  top: 40%;
`;

export const MenuButton = styled.button`
  background-color: transparent;
  width: 100%;
  padding: 8px 0;

  font-size: 14px;
  white-space: nowrap;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f2f2f2;
  }
`;
