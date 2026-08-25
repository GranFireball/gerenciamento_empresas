import { type CompanyDto } from "./schemas/company";
import Form from "./components/form";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCompany } from "../../hooks/use-edit-company";
import Loading from "../../components/loading";
import Error from "../../components/error";
import { useGetCompany } from "../../hooks/use-get-company";
import Button from "../../components/button";

export default function EditCompany() {
  const { id } = useParams();

  if(!id) {
    return (
      <Error message="ID não identificado."/>
    )
  }

  const navigate = useNavigate();

  const { mutate, isPending } = useEditCompany();
  
	const onSubmit = (data: CompanyDto) => {
		mutate({
      id,
      payload: data
    }, {
      onSuccess: () => {
        navigate("/")
      }
    });
	};

  const { data, isLoading, error } = useGetCompany(id);
  
  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <Error message="Erro ao buscar empresa."/>
  }

  return (
    <div className="py-8">
      <h1 className="flex justify-center items-center font-bold text-xl">Editar Empresa</h1>
      <div className="p-4">
        <Button
          onClick={() => navigate("/")}
          text="Voltar"
        />
        <div className="mt-4 flex justify-center">
          <Form onSubmit={onSubmit} isLoading={isPending} data={data.data}/>
        </div>
      </div>
    </div>
  )
}