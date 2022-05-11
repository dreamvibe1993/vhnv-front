import styled from "styled-components";

export const AppTextarea = styled.textarea`
  border: none;
  padding: 0.5rem 1rem;
  resize: none;
  min-height: 10rem;
  background-color: ${(p) => p.theme.light};
  color: ${(p) => p.theme.dark};
  border-radius: 2px;
`;
