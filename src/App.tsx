import AppRoutes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { DashboardLayout } from "./shared/components/dashboard-layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {


  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter basename="/">
          <DashboardLayout>
            <AppRoutes />
          </DashboardLayout>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
