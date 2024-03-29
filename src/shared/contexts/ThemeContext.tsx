import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { MainTheme } from "../themes";

interface IThemeContextData {
  themeName: "dark" | "main";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

interface IThemeProvider {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const [themeName, setThemeName] = useState<"dark" | "main">("main");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === "main" ? "dark" : "main"));
  }, []);

  const theme = MainTheme

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
