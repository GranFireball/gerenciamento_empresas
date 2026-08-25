import { type CompanyDto } from "./schemas/company";
import Form from "./components/form";
import { useCreateCompany } from "../../hooks/use-create-company";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

export default function CreateCompany() {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateCompany();
  
	const onSubmit = (data: CompanyDto) => {
		mutate(data, {
      onSuccess: () => {
        navigate("/")
      }
    });
	};

  return (
    <div className="py-8">
      <h1 className="flex justify-center items-center font-bold text-xl">Cadastrar Empresa</h1>
      <div className="p-4">
        <Button
          onClick={() => navigate("/")}
          text="Voltar"
        />
        <div className="mt-4 flex justify-center">
          <Form onSubmit={onSubmit} isLoading={isPending}/>
        </div>
      </div>
    </div>
  )
}