import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import ListCompanies from "../views/companies/list-companies";
import CreateCompany from "../views/companies/create-company";
import EditCompany from "../views/companies/edit-company";

export default function AppRoutes(){
  return(
    <Routes>
      <Route path='/' element={<ListCompanies/>} />
      <Route path="/:id/edit" element={<EditCompany/>} />
      <Route path="/create" element={<CreateCompany/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}