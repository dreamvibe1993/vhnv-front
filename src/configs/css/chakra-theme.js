import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  // colorModeManager: "localStorage"
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bgGradient: mode("linear(to-br, green.100, pink.100)", "linear(to-br, red.900, gray.900)")(props),
      },
    }),
  },
});

export default theme;
