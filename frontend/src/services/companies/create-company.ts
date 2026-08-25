import type { CompanyDto } from "../../views/companies/schemas/company";
import apiRequest from "../api/api";

export const createCompany = async (payload: CompanyDto) => {
  const { data } = await apiRequest.post('/companies', payload);

  return data;
};
