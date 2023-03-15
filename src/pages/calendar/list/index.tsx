import React, { useEffect, useState } from "react";
import { Box, Button, Card, Icon, Typography } from "@mui/material";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ScheduleService } from "../../../shared/services/ScheduleService/ScheduleService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import {
  EventService,
  EventProps,
  EventListProps,
} from "../../../shared/services/EventService/EventService";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

interface CalendarEvent {
  id: string;
  title: string;
  // startStr: string;
  // description: string;
  // end: string;
  start: string;
}

export const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [eventList, setEventList] = useState<EventProps[]>([]);
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja mesmo Apagar o registro?")) {
      EventService.deleteById(id)
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
    EventService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          enqueueSnackbar(data.message, {
            variant: 'error'
          })
        } else {
          setEventList(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    const events = eventList.map((event) => {
      const { id, date, title } = event;
      return {
        id: String(id),
        start: date,
        title: title,
        // startStr: date,
        // end: date,
        // description: 'Descrição'
      };
    });
    setCalendarEvents(events);
  }, [eventList]);

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

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              onClick={() => navigate("/agenda/novo")}
            >
              <Icon>add_circle_outline</Icon>
              <Typography
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                alignSelf="start"
                marginTop={0}
              >
                Novo Evento
              </Typography>
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
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={ptBrLocale}
            events={[...calendarEvents]}
            height="auto"
            defaultAllDay
            // select
          />
        </Card>
      </Box>
    </LayoutBaseDePagina>
  );
};
