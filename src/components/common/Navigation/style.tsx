import { styled } from "styled-components";
import media from "@/styles/media";

export const Container = styled.nav`
  margin-top: 20px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  position: sticky;
  top: 40px;

  ${media.small`
    background-color: #fff;
    margin: 0;
    width: 100%;

    border-top: 1px solid rgba(0, 0, 0, 0.2);

    position: fixed;
    bottom: 0;
    top: auto;

    z-index: 10;
  `}
`;

export const Wrapper = styled.div`
  min-width: 180px;
  padding: 10px 14px;

  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  ${media.small`
    width: 100%;
    border: none;
    padding: 0;
  `}
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 7px;

  ${media.small`
    width: 100%;
    
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `}
`;

export const Item = styled.li`
  padding: 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${media.small`
    display: flex;
    flex-direction: column;
  `}
`;

export const Icon = styled.div``;

export const Text = styled.span`
  font-size: 16px;
  white-space: nowrap;

  ${media.small`
    font-size: 12px;
  `}
  ${media.mobile`
    font-size: 10px;
  `}
`;
