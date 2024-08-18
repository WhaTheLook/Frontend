import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 300px;
  padding: 5px;

  border-radius: 8px;
`;

export const Divider = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 1px;
  margin: 5px 0;
`;

export const BaseButton = styled.button`
  background-color: transparent;
  width: 100%;
  padding: 12px 0;

  font-size: 15px;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const EditButton = styled(BaseButton)`
  color: #000;
`;

export const DeleteButton = styled(BaseButton)`
  color: #e74c3c;
`;
