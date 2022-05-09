import styled from "styled-components";

export const AppButton = styled.button`
    background-color: ${(p) => p.theme.darkest};
    color: ${(p) => p.theme.lightest};
    padding: .5rem 1rem;
    max-width: 33%;
    border: none;
    border-radius: 1px;
`;
