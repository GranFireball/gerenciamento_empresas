import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CompanyDto } from "../views/companies/schemas/company";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api-error";
import { editCompany } from "../services/companies/edit-company";
import { toast } from "react-toastify";

export const useEditCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: CompanyDto }) => editCompany(id, payload),
    onSuccess: (data, { id }: { id: string, payload: CompanyDto}) => {
      queryClient.invalidateQueries({ queryKey: ['companies']});
      queryClient.invalidateQueries({ queryKey: [`company-${id}`]});
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiError>) => toast.error(error.response?.data.message)
  })
}
