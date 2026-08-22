import App from "../App";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../components/page-not-found";

export default function AppRoutes(){
  return(
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}