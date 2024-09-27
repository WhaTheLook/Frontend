import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 99px;
  }
`;
