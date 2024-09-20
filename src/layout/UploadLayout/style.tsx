import media from "@/styles/media";
import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  width: 100%;
  max-width: 650px;
  padding: 0 20px 150px 20px;

  display: flex;
  gap: 50px;

  ${media.mobile`
    padding: 0 10px 100px 10px;
 `}
`;

export const Main = styled.main`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: "center";
`;
