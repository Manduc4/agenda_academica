import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Icon,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { daysOfWeek } from "../../../shared/utils/dateAndTime";
import {
  ScheduleProps,
  ScheduleService,
} from "../../../shared/services/api/ScheduleService/ScheduleService";
import dayjs from "dayjs";
import { useAppThemeContext } from "../../../shared/contexts";
import Item from "../components/Item";
import axios from "axios";
import { useSnackbar } from "notistack";

export const ScheduleList: React.FC = () => {
  const [rows, setRows] = useState<ScheduleProps[]>();
  const navigate = useNavigate();
  const { themeName } = useAppThemeContext();
  const theme = useTheme();
  const style = {
    mainBackground: theme.palette.primary.main,
    mainColor: theme.palette.getContrastText(theme.palette.primary.main),
    eventBackground:
      themeName === "dark" ? theme.palette.background.paper : "#ccc",
    eventColor:
      themeName === "dark"
        ? theme.palette.getContrastText(theme.palette.background.paper)
        : "#",
    dayBottomBorder: `${theme.spacing(0.2)} solid ${
      theme.palette.secondary.contrastText
    }`,
  };
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    ScheduleService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          enqueueSnackbar(data.message, {
            variant: "error",
          });
        } else {
          setRows(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    // axios
    //   .get(
    //     "https://agenda-acad-default-rtdb.firebaseio.com/"
    //   )
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <LayoutBaseDePagina>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          boxSizing: "border-box",
          minWidth: 700,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h3"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            alignSelf="start"
          >
            Horários
          </Typography>
          <Box sx={{ marginTop: 2, width: 100 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "100%" }}
              onClick={() => navigate("/horarios/novo")}
            >
              <Icon>add_circle_outline</Icon>
            </Button>
          </Box>
        </Stack>
        <Card
          sx={{
            mt: 4,
            justifyContent: "space-between",
            boxSizing: "border-box",
            heigth: "100%",
            borderRadius: 3,
            padding: 2,
            display: "flex",
            flexDirection: "row",
            border: style.dayBottomBorder,
          }}
        >
          {daysOfWeek.map((day, index) => {
            return (
              <Stack
                key={index}
                spacing={1}
                sx={{
                  alignItems: "center",
                  width: "100%",
                  height: "auto",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    borderBottom: style.dayBottomBorder,
                    width: "100%",
                    paddingBottom: 1,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                    fontSize={20}
                  >
                    {day}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {rows?.map((row, index) => {
                    const { dayOfWeek } = row;

                    if (dayOfWeek === day) {
                      return <Item key={index} row={row} />;
                    }
                  })}
                </Box>
              </Stack>
            );
          })}
        </Card>
      </Box>
    </LayoutBaseDePagina>
  );
};
