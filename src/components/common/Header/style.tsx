import { styled } from "styled-components";

export const Container = styled.header`
  width: 100%;
  padding: 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  max-width: 1024px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #000000;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LoginMessage = styled.span`
  font-size: 16px;
`;

export const UserName = styled.span`
  font-weight: 600;
`;
