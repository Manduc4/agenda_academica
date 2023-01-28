import { useEffect } from "react";
import { Routes, Navigate, Route } from "react-router-dom";

import { Dashboard } from "../pages";
import { useDrawerContext } from "../shared/contexts";
import { SubjectList } from "../pages/subjects/list";
import NewSubject from "../pages/subjects/new";
import Calendar from "../pages/calendar/Calendar";
import NewNote from "../pages/notes/new";
import { NotesList } from "../pages/notes/list";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Disciplinas",
        icon: "menu_book",
        path: "/disciplinas",
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
        label: "Configurações",
        icon: "settings",
        path: "/configuracoes",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/disciplinas" element={<SubjectList />} />
      <Route path="/disciplinas/nova" element={<NewSubject />} />
      <Route path="/disciplinas/:id" element={<NewSubject />} />
      <Route path="/notas/nova" element={<NewNote />} />
      <Route path="/notas" element={<NotesList />} />
      <Route path="/agenda" element={<Calendar />} />
      <Route path="/horarios" element={<Dashboard />} />
      <Route path="/faltas" element={<Dashboard />} />
      <Route path="/configuracoes" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="pagina-inicial" />} />
    </Routes>
  );
};
