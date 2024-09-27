import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  width: 343px;
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border-radius: 8px;
  background: #ffffff;

  ${media.mobile`
    padding: 15px 0;
    width: 280px;
  `}
`;

export const TextWrapper = styled.div`
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;

  ${media.mobile`
    padding: 10px 0;
    gap: 14px;
  `}
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 20px;

  ${media.mobile`
    font-size: 16px;
  `}
`;

export const Text = styled.span`
  font-size: 16px;

  ${media.mobile`
    font-size: 14px;
  `}
`;

export const ButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  gap: 10px;

  ${media.mobile`
    gap: 7px;
  `}
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 10px 24px;

  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;

  border-radius: 8px;
  border: none;

  cursor: pointer;

  ${media.mobile`
    padding: 10px 16px;
    font-size: 12px;
  `}
`;

export const CancleButton = styled(BaseButton)`
  background-color: #e2e2e2;
  color: #000;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const ConfirmButton = styled(BaseButton)`
  background-color: #222222;
  color: #fff;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
