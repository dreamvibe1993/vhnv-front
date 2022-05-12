import styled from "styled-components";

export const AppToolbar = styled.div`
  padding: 1rem;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
