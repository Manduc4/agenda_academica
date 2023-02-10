import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppThemeContext } from "../../../shared/contexts";
import { ScheduleService } from "../../../shared/services/api/ScheduleService/ScheduleService";
import { daysOfWeek } from "../../../shared/utils/dateAndTime";
import DayOfWeekLabel from "../../../shared/components/week-header";
import { monthStyle, columnMonthStyle, dayStyle } from "./MonthStyles";

interface MonthProps {
  month: any[];
}

interface MonthColumnProps {
  monthColumn: any[];
  dayLabelIndex: number;
}

interface DayProps {
  day: any;
}
const Day: React.FC<DayProps> = ({ day }) => {
  return (
    <Box sx={dayStyle}>
      <Typography>{day.format("DD")}</Typography>
    </Box>
  );
};

const MonthColumn: React.FC<MonthColumnProps> = ({
  monthColumn,
  dayLabelIndex,
}) => {
  return (
    <Box sx={columnMonthStyle.general}>
      <DayOfWeekLabel day={dayLabelIndex} />
      <Box id="column-days" sx={columnMonthStyle.numbers}>
        {monthColumn.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </Box>
    </Box>
  );
};

const Month: React.FC<MonthProps> = ({ month }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(dayjs().clone());
  const startDay = value.clone().startOf("month").startOf("week");

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

  return (
    <Box id="month" sx={monthStyle}>
      {month.map((monthColumn, dayLabelIndex) => {
        return (
          <MonthColumn
            key={dayLabelIndex}
            monthColumn={monthColumn}
            dayLabelIndex={dayLabelIndex}
          />
        );
      })}
    </Box>
  );
};

export default Month;
