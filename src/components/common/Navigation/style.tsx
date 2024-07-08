import { styled } from "styled-components";

export const Container = styled.div`
  min-width: 180px;
  height: fit-content;
  padding: 10px 14px;
  margin-top: 20px;

  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  position: sticky;
  top: 40px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 7px;
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
`;

export const Icon = styled.div``;

export const Text = styled.span`
  font-size: 16px;
`;
