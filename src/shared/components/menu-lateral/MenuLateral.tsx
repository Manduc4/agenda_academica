import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";

interface ILIstItemLinkProps {
  label: string;
  icon: string;
  route: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ILIstItemLinkProps> = ({ label, icon, route, onClick}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(route);
  const match = useMatch({ path: resolvedPath.pathname, end: false})

  const handleClick = () => {
    navigate(route);
    onClick?.();
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick} >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )

}

interface IMenuLateral {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateral> = ( {children} ) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions } = useDrawerContext()

  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen}  variant={smDown ? 'temporary' : 'permanent'} >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent="center" alignItems="center">
            <Avatar 
              src="https://preview.redd.it/okl106l8vgp41.png?auto=webp&s=d7a3ccd0e6eae1584762b05187745b6a24fd9f85"
              sx={{ height: theme.spacing(12), width: theme.spacing(12)}}
            />
          </Box>

          <Divider />

          <Box flex={1}> 

            <List component='nav'>
              {drawerOptions.map((drawerOption) => (
                <ListItemLink 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  route={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
              
            </List>

          </Box>

          <Box> 
            <List component='nav'>
              <ListItemButton onClick={toggleTheme} >
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>  
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={ smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}