import LoginPage from "@src/pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"

const AppRoute = () => (
  <BrowserRouter basename="inventory-qi">
    <Routes>
      <Route index element={<LoginPage />}/>
      <Route path="*" element={<></>}/>
    </Routes>
  </BrowserRouter>
)

export default AppRoute