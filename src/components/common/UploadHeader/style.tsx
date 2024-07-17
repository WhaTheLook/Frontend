import styled from "styled-components";

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

export const UploadButton = styled.div`
  background-color: #222222;
  padding: 10px 14px;

  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  border-radius: 99px;

  outline: none;
`;
