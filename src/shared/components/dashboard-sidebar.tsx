import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { useAppThemeContext, useDrawerContext } from "../contexts";
import { NavItem } from "./nav-item";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/pagina-inicial",
    icon: <ChartBarIcon fontSize="small" />,
    label: "Página Inicial",
  },
  {
    label: "Agenda",
    icon: "event_note",
    path: "/agenda",
  },
  {
    label: "Horários",
    icon: "timer",
    path: "/horarios",
  },
  {
    label: "Disciplinas",
    icon: "menu_book",
    path: "/disciplinas",
  },
  {
    label: "Notas",
    icon: "workspace_premium",
    path: "/notas",
  },
  {
    label: "Faltas",
    icon: "event_busy",
    path: "/faltas",
  },
  {
    path: "/conta",
    icon: <UserIcon fontSize="small" />,
    label: "Conta",
  },
  {
    label: "Configurações",
    icon: "settings",
    path: "/configuracoes",
  }
  // {
  //   path: "/login",
  //   icon: <LockIcon fontSize="small" />,
  //   label: "Login",
  // },
  // {
  //   path: "/register",
  //   icon: <UserAddIcon fontSize="small" />,
  //   label: "Register",
  // },
  // {
    //   path: "/settings",
    //   icon: <CogIcon fontSize="small" />,
    //   label: "Settings",
    // },
    // {
    //   path: "/customers",
    //   icon: <UsersIcon fontSize="small" />,
    //   label: "Customers",
    // },
    // {
    //   path: "/products",
    //   icon: <ShoppingBagIcon fontSize="small" />,
    //   label: "Products",
    // },
  // {
  //   path: "/404",
  //   icon: <XCircleIcon fontSize="small" />,
  //   label: "Error",
  // },
  // {
  //   label: "Página Inicial",
  //   icon: "home",
  //   path: "/pagina-inicial",
  // },
];



export const DashboardSidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const navigate = useNavigate();

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions } =
    useDrawerContext();

  useEffect(() => {
    if (isDrawerOpen) {
      toggleDrawerOpen();
    }
    setDrawerOptions(navItems)
  }, []);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link to="/">
              <a>
                {/* <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                /> */}
              </a>
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Agenda Acadêmica
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Caio Manduca
                </Typography>
              </div>
              {/* <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {drawerOptions.map((item) => {
            const { path, icon, label } = item;

            return (
              <NavItem
                key={path}
                icon={icon}
                route={path}
                label={label}
                onClick={() => navigate(path)}
              />
            );
          })}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        {/* <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
          <Link to="https://material-kit-pro-react.devias.io/">
            <Button
              color="secondary"
              component="a"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </Link>
        </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={toggleDrawerOpen}
      open={isDrawerOpen}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
