import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        font-size: 10px;
    }

    body {
        font-size: 1.6rem;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", 'Inconsolata',
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${(p) => p.theme.darker};
        color: ${(p) => p.theme.lightest};
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", Inconsolata,
        monospace;
    }

`;
