import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LayoutBaseDePagina } from "../../shared/layouts";

export default function Calendar() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LayoutBaseDePagina>
    </LayoutBaseDePagina>
  );
}
