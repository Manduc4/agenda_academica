import PropTypes from "prop-types";
import { Box, Button, ListItem, Icon } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath, Link } from "react-router-dom";
import SvgIconProps from "@mui/material";
import IconButton from "@mui/material/IconButton";

// interface ILIstItemLinkProps {
//   label: string;
//   icon: string | SvgIconProps;
//   route: string;
//   onClick: (() => void) | undefined;
// }

export const NavItem = ({ label, icon, route, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(route);
  const active = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(route);
    onClick?.();
  };

  // const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      // {...others}
    >
      <Link to={route} style={{ textDecoration: "none" }}>
        <Button
          component="a"
          startIcon={
            typeof icon === "string" ? (
              <Icon sx={{ textDecoration: "none" }}>{icon}</Icon>
            ) : (
              <Icon>{icon}</Icon>
            )
          }
          disableRipple
          onClick={handleClick}
          sx={{
            backgroundColor: !!active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: !!active ? "secondary.main" : "neutral.300",
            fontWeight: !!active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: !!active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
            textDecoration: "none",
            textDecorationLine: "none",
            textDecorationThickness: "none",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{label}</Box>
        </Button>
      </Link>
    </ListItem>
  );
};
