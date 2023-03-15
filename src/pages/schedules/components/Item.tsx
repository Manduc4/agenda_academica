import { useState } from "react";
import {
  Box,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppThemeContext } from "../../../shared/contexts";
import {
  ScheduleProps,
  ScheduleService,
} from "../../../shared/services/ScheduleService/ScheduleService";

interface Item {
  row: ScheduleProps;
}

const Item: React.FC<Item> = ({ row }) => {
  const theme = useTheme();
  const { themeName } = useAppThemeContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { start, end, subject, id } = row;
  const formatedEnd = dayjs(end).format("hh:mm");
  const formatedStart = dayjs(start).format("hh:mm");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja mesmo Apagar o registro?")) {
      ScheduleService.deleteById(id)
        .then((data) => {
          if (data instanceof Error) {
            console.log("error", data.message);
          }
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const style = {
    eventBackground:
      themeName === "dark" ? theme.palette.background.paper : "#ccc",
    eventColor: theme.palette.secondary.contrastText,
    eventBottomBorder: `${theme.spacing(
      0.2
    )} solid ${theme.palette.getContrastText(theme.palette.primary.main)}`,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        marginTop: 1,
        maxWidth: 150,
        borderRadius: 2,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#5048E5",
      }}
    >
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => navigate(`/horarios/${id}`)}
        >
          <ListItemIcon>
            <Icon>edit</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Editar"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => handleDelete(id)}
        >
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Deletar"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
      <Box
        component={Button}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          textTransform: "none",
          width: "100%",
          height: "100%",
          color: style.eventColor,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: style.eventColor,
          }}
          fontSize={14}
        >
          {subject}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: style.eventColor,
          }}
          fontSize={14}
          fontWeight={100}
        >
          {formatedStart} as {formatedEnd}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
