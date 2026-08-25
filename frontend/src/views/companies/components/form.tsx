import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CompanySchema, type CompanyDto } from "../schemas/company";
import SubmitButton from "../../../components/submit-button";
import InputForm from "./input-form";
import type { Company } from "../../../types/companies";

interface FormProps {
  onSubmit: (data: CompanyDto) => void;
  isLoading: boolean;
  data?: Company;
}

export default function Form({ onSubmit, isLoading, data }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDto>({
    resolver: zodResolver(CompanySchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-1 rounded-md flex flex-col gap-2"
    >
      <InputForm
        label="Nome"
        name="name"
        register={register}
        error={errors.name}
        defaultValue={data?.name}
      />

      <InputForm
        label="CNPJ"
        name="cnpj"
        register={register}
        error={errors.cnpj}
        defaultValue={data?.cnpj}
      />

      <InputForm
        label="Nome fantasia"
        name="fantasyName"
        register={register}
        error={errors.fantasyName}
        defaultValue={data?.fantasyName}
      />

      <InputForm
        label="Endereço"
        name="address"
        register={register}
        error={errors.address}
        defaultValue={data?.address}
      />

      <SubmitButton isLoading={isLoading}/>
    </form>
  );
}