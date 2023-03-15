import { useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { SubjectList } from "../pages/subjects/list";
import NewSubject from "../pages/subjects/new";
import NewNote from "../pages/notes/new";
import { NotesList } from "../pages/notes/list";
import { CollegeFaultList } from "../pages/college_faults/list";
import NewCollegeFault from "../pages/college_faults/new";
import { ScheduleList } from "../pages/schedules/list";
import NewSchedule from "../pages/schedules/new";
import { Calendar } from "../pages/calendar/list";
import Account from "../pages/account";
import Settings from "../pages/settings";
import NewEvent from "../pages/calendar/new";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/#",
      children: [
        {
          path: "/disciplinas",
          element: <SubjectList />,
        },
        {
          path: "disciplinas/nova",
          element: <NewSubject />,
        },
        {
          path: "disciplinas/:id",
          element: <NewSubject />,
        },
        {
          path: "notas",
          element: <NotesList />,
        },
        {
          path: "notas/nova",
          element: <NewNote />,
        },
        {
          path: "notas/:id",
          element: <NewNote />,
        },
        {
          path: "faltas",
          element: <CollegeFaultList />,
        },
        {
          path: "faltas/nova",
          element: <NewCollegeFault />,
        },
        {
          path: "faltas/:id",
          element: <NewCollegeFault />,
        },
        {
          path: "horarios",
          element: <ScheduleList />,
        },
        {
          path: "horarios/novo",
          element: <NewSchedule />,
        },
        {
          path: "horarios/:id",
          element: <NewSchedule />,
        },
        {
          path: "agenda",
          element: <Calendar />,
        },
        {
          path: "agenda/novo",
          element: <NewEvent />,
        },
        {
          path: "agenda/:id",
          element: <NewEvent />,
        },
        {
          path: "conta",
          element: <Account />,
        },
        {
          path: "configuracoes",
          element: <Settings />,
        },
      ],
    },
  ]);
};

export default AppRoutes;
