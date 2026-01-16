import NotFound from "@src/pages/NotFoundPage"
import { BrowserRouter, Route, Routes } from "react-router"
import NotAuthorizedPage from "@src/pages/NotAuthorizedPage"
import { Suspense } from "react"
import MainLayout from "@src/layouts/MainLayout";
import LoginPage from "@src/pages/LoginPage";

const Router = () => (
  <BrowserRouter basename="inventory-qi">
    <Suspense fallback={<></>}>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="app" element={<MainLayout />} >
          {/*<Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory-report" element={<InventoryReportPage />} />*/}
        </Route>
        <Route path="not-authorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default Router