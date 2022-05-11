import styled from "styled-components";

export const AppInput = styled.input`
  border: none;
  padding: 0.5rem 1rem;
  background-color: ${(p) => p.theme.light};
  color: ${(p) => p.theme.dark};
  border-radius: 2px;
`;
