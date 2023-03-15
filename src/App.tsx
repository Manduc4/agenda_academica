import AppRoutes from "./routes";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { DashboardLayout } from "./shared/components/dashboard-layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {


  return (
    <AppThemeProvider>
      <DrawerProvider>
        <HashRouter basename="/">
          <DashboardLayout>
            <AppRoutes />
          </DashboardLayout>
        </HashRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
