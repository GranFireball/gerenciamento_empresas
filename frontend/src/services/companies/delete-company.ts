import apiRequest from "../api/api";

export const deleteCompany = async (id: string) => {
  const { data } = await apiRequest.put(`/companies/${id}/delete`);

  return data;
};
