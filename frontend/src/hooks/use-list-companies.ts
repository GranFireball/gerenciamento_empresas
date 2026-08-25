import { useQuery } from "@tanstack/react-query";
import { listCompanies } from "../services/companies/list-companies";

export const useListCompanies = () => 
  useQuery({
    queryKey: ['companies'],
    queryFn: () => listCompanies(),
    staleTime: 1000 * 60 * 5
  })
