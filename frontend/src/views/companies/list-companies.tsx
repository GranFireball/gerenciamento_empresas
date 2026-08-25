import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Error from "../../components/error";
import Loading from "../../components/loading";
import { useListCompanies } from "../../hooks/use-list-companies";
import type { Company } from "../../types/companies";
import Card from "./components/card";

export default function ListCompanies() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useListCompanies();
  
  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <Error message="Erro ao buscar empresas."/>
  }

  return (
    <div className="py-8">
      <h1 className="flex justify-center items-center font-bold text-xl">Empresas Cadastradas</h1>
      <div className="p-4">
        <Button
          onClick={() => navigate("/create")}
          text="Nova empresa"
          color="green"
        />
        <div className="mt-4 flex flex-wrap gap-4">
          {
            data?.data && data.data.length > 0 ? data.data.map((company: Company) => {
              return <Card key={company.id} company={company} />
            })
            :
            <p>Nenhuma empresa cadastrada</p>
          }
        </div>
      </div>
    </div>
  )
}