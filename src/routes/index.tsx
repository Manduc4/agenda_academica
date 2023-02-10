import { useRoutes } from "react-router-dom";
import { SubjectList } from "../pages/subjects/list";
import NewSubject from "../pages/subjects/new";
import NewNote from "../pages/notes/new";
import { NotesList } from "../pages/notes/list";
import { CollegeFaultList } from "../pages/college_faults/list";
import NewCollegeFault from "../pages/college_faults/new";
import { ScheduleList } from "../pages/schedules/list";
import NewSchedule from "../pages/schedules/new";
import { Calendar } from "../pages/calendar/list";
import { DashboardLayout } from './../shared/components/dashboard-layout';
import Account from "../pages/account";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "disciplinas",
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
          path: "/notas",
          element: <NotesList />
        },
        {
          path: "notas/nova", 
          element: <NewNote />
        },
        {
          path: "notas/:id",
          element: <NewNote />
        }, 
        {
          path: "faltas",
          element: <CollegeFaultList />
        },
        {
          path: "faltas/nova",
          element: <NewCollegeFault />
        },
        {
          path: "faltas/:id",
          element: <NewCollegeFault />
        },
        {
          path: "horarios",
          element: <ScheduleList />
        },
        {
          path: "horarios/novo",
          element: <NewSchedule />
        },
        {
          path: "horarios/:id",
          element: <NewSchedule />
        },
        {
          path: "agenda", 
          element: <Calendar />
        },
        {
          path: "conta",
          element: <Account />
        }
      ],
    },
  ]);
  // return (
  //   <Routes>
  //     <Route path="/pagina-inicial" element={<Dashboard />} />
  //     <Route path="/disciplinas" element={<SubjectList />} />
  //     <Route path="/disciplinas/nova" element={<NewSubject />} />
  //     <Route path="/disciplinas/:id" element={<NewSubject />} />
  //     <Route path="/notas" element={<NotesList />} />
  //     <Route path="/notas/nova" element={<NewNote />} />
  //     <Route path="/notas/:id" element={<NewNote />} />
  //     <Route path="/faltas" element={<CollegeFaultList />} />
  //     <Route path="/faltas/nova" element={<NewCollegeFault />} />
  //     <Route path="/faltas/:id" element={<NewCollegeFault />} />
  //     <Route path="/horarios" element={<ScheduleList />} />
  //     <Route path="/horarios/novo" element={<NewSchedule />} />
  //     <Route path="/horarios/:id" element={<NewSchedule />} />
  //     <Route path="/agenda" element={<Calendar />} />
  //     <Route path="/configuracoes" element={<Dashboard />} />
  //     {/* <Route path="*" element={<Navigate to="pagina-inicial" />} /> */}
  //   </Routes>
  // );
};

export default AppRoutes;
