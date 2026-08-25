import apiRequest from "../api/api";

export const listCompanies = async () => {
  const { data } = await apiRequest.get('/companies');

  return data;
};
