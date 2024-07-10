import styled from "styled-components";

export const Container = styled.div`
  background: rgba(35, 35, 35, 0.6);
  backdrop-filter: blur(2px);
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
`;
