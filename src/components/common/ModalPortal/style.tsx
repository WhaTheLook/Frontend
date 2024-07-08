import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  background: rgba(35, 35, 35, 0.6);
  backdrop-filter: blur(2px);
  z-index: 9999;
`;
