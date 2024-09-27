import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  ${media.mobile`
    gap: 10px;
  `}
`;

export const Title = styled.div`
  margin-top: 10px;

  font-size: 22px;
  font-weight: 600;

  ${media.mobile`
    margin-top: 6px;
    font-size: 18px;
  `}
`;

export const Text = styled.span`
  font-size: 15px;
  color: #a0a0a0;

  ${media.mobile`
    font-size: 13px;
  `}
`;

export const Button = styled.span`
  background-color: #222222;
  padding: 15px 45px;
  margin-top: 15px;

  font-size: 16px;
  font-weight: 600;
  color: #fff;

  border: none;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${media.mobile`
    margin-top: 10px;
    padding: 12px 30px;
    font-size: 14px;
  `}
`;
