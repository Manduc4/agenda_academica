import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Icon,
  Popover,
  TextField,
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
import Month from "../components/Month";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const { themeName } = useAppThemeContext();
  const theme = useTheme();
  const [month, setMonth] = useState([]);
  const [day, setDay] = useState(dayjs());
  const [value, setValue] = useState(dayjs());

  const [rows, setRows] = useState<ScheduleProps[]>();
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

  const startDay = day.clone().startOf("month");
  const endDay = day.clone().endOf("month");

  const getMonthDays = () => {
    const restOfLastMonth = Array(startDay.day())
      .fill(0)
      .map((_, index) => {
        return startDay.clone().subtract(index + 1, "day");
      });
    restOfLastMonth.reverse();

    const initOfNextMonth = Array(6 - endDay.day())
      .fill(0)
      .map((_, index) => {
        return endDay.clone().add(index + 1, "day");
      });

    const currentMonthDays = Array(day.daysInMonth())
      .fill(0)
      .map((value, index) => day.clone().add(index, "day"));

    const allDays = [
      ...restOfLastMonth,
      ...currentMonthDays,
      ...initOfNextMonth,
    ];

    return allDays;
  };

  const getMonth = () => {
    const daysInMonth = getMonthDays();

    const month = Array(daysOfWeek.length)
      .fill(0)
      .map((_, dayOfWeekIndex) => {
        const monthColumn = daysInMonth.filter((day) => {
          return day.day() === dayOfWeekIndex;
        });
        return monthColumn;
      });

    return month;
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

  useEffect(() => {
    ScheduleService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          window.alert(data.message);
        } else {
          setRows(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    setMonth(getMonth());
  }, [value]);

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
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", marginTop: 0 }}
        >
          <Typography
            variant="h3"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            alignSelf="start"
            marginTop={0}
          >
            Agenda
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              mask="____/__/__"
              value={value.format("dd/mm/yyyy")}
              onChange={(newValue) => {
                // setValue(newValue);
                setDay(dayjs(newValue));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

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
            flexDirection: "column",
            border: style.dayBottomBorder,
          }}
        >
          <Month month={month} />
        </Card>
      </Box>
    </LayoutBaseDePagina>
  );
};
