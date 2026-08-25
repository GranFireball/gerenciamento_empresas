import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "../services/companies/create-company";
import type { CompanyDto } from "../views/companies/schemas/company";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api-error";
import { toast } from "react-toastify";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CompanyDto) => createCompany(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['companies']});
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiError>) => toast.error(error.response?.data.message)
  })
}
