import NotFound from "@src/pages/NotFoundPage"
import { BrowserRouter, Route, Routes } from "react-router"
import NotAuthorizedPage from "@src/pages/NotAuthorizedPage"
import { lazy, Suspense } from "react"
import MainLayout from "@src/layouts/MainLayout";
import LoginPage from "@src/pages/LoginPage";
import InventoryReportPage from "@src/pages/InventoryReportPage";
import WelcomePage from "@src/pages/WelcomePage";
import BackdropComponent from "@src/components/backdrop/BackdropComponent";
import AuthProvider from "@src/providers/auth/AuthProvider";
import AuthGuard from "@src/guard/AuthGuard";

const InventoryPage = lazy(() => import("@src/pages/InventoryPage"));

const Router = () => (
  <BrowserRouter basename="inventory-qi">
    <Suspense fallback={<BackdropComponent open />}>
      <Routes>
        <Route index 
          element={
            <AuthProvider>
              <LoginPage />
            </AuthProvider>
          } 
        />
        <Route path="app" 
          element={
            <AuthProvider>
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            </AuthProvider>
          } 
        >
          <Route index element={<WelcomePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory-report" element={<InventoryReportPage />} />
        </Route>
        <Route path="not-authorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default Router