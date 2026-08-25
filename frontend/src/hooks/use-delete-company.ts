import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "../services/companies/delete-company";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api-error";
import { toast } from "react-toastify";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['companies']});
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiError>) => toast.error(error.response?.data.message)
  })
}
