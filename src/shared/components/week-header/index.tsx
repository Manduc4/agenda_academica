import { Box, Typography } from "@mui/material";
import { daysOfWeek } from "../../utils/dateAndTime";

interface WeekHeaderProps {
  day: string|number
}

const DayOfWeekLabel: React.FC<WeekHeaderProps> = ({ day }) => {
  return (
    <Box sx={{ borderBottom: "1px solid", paddingBottom: 1, width: '100%' }}>
      <Typography
        sx={{
          textAlign: "center",
        }}
        fontSize={20}
      >
        {typeof(day) === "string" ? day : daysOfWeek[day]}
      </Typography>
    </Box>
  );
};

export default DayOfWeekLabel