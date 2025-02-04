import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${media.mobile`
    gap: 5px;
  `}
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

  ${media.mobile`
    width: 50px;
    height: 50px;
  `}
`;

export const ButtonText = styled.span`
  font-size: 16px;
  color: #828282;
  white-space: nowrap;

  user-select: none;

  ${media.mobile`
    font-size: 10px;
  `}
`;
