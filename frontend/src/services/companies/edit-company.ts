import type { CompanyDto } from "../../views/companies/schemas/company";
import apiRequest from "../api/api";

export const editCompany = async (id: string, payload: CompanyDto) => {
  const { data } = await apiRequest.put(`/companies/${id}`, payload);

  return data;
};
