import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../services/companies/get-company";

export const useGetCompany = (id: string) => 
  useQuery({
    queryKey: [`company-${id}`],
    queryFn: () => getCompany(id),
    staleTime: 1000 * 60 * 5
  })
