
import { BrowserRouter, Route, Routes } from "react-router"

const AppRoute = () => (
  <BrowserRouter basename="inventori-qi">
    <Routes>
      <Route index element={<></>}/>
      <Route path="*" element={<></>}/>
    </Routes>
  </BrowserRouter>
)

export default AppRoute