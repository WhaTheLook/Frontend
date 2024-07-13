import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  position: relative;
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
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
  background-color: #424242;
  padding: 9px 12px;

  font-size: 15px;
  color: #ffffff;
  white-space: nowrap;

  border-radius: 999px;

  cursor: pointer;

  animation: ${scaleUp} 0.1s ease-in;
`;

export const Input = styled.input`
  padding: 7px 0;

  font-size: 18px;

  border: none;

  outline: none;
`;

export const InfoTextBox = styled.div`
  background-color: #424242;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: 14px;
  color: #ffffff;

  position: absolute;
  top: 110%;
`;

export const InfoText = styled.span`
  white-space: nowrap;
`;
