import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface LayoutBaseDePaginaProps {
  children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<LayoutBaseDePaginaProps> = ({
  children,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      gap={1}
      // sx={{ marginTop: 0 }}
    >
      <Box p={1} display="flex" alignItems="center" gap={1}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
      </Box>

      <Box
        overflow="hidden"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 8,
          paddingTop: 5
          // marginTop: 0
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
