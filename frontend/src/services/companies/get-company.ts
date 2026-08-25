import apiRequest from "../api/api";

export const getCompany = async (id: string) => {
  const { data } = await apiRequest.get(`/companies/${id}`);

  return data;
};
