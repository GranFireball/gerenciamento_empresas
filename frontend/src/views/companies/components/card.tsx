import { useNavigate } from "react-router-dom";
import { useDeleteCompany } from "../../../hooks/use-delete-company";
import type { Company } from "../../../types/companies";
import Button from "../../../components/button";

interface CardProps {
  company: Omit<Company, "createdAt" | "updatedAt" | "deletedAt">
}

export default function Card({
  company
}: CardProps){
  const {
    id,
    name,
    cnpj,
    fantasyName,
    address,
  } = company;

  const navigate = useNavigate();

  const { mutate: deleteCompany, isPending: isLoadingDelete } = useDeleteCompany();

  const onDelete = () => {
    deleteCompany(id);
  };

  return (
    <div className="p-4 border-1 rounded-md w-fit">
      <div className="flex justify-between items-center gap-8 mb-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <div className="flex gap-4">
          <Button onClick={() => navigate(`/${id}/edit`)} text="Editar" color="blue"/>
          <Button onClick={() => onDelete()} text="Excluir" color="red" disabled={isLoadingDelete}/>
        </div>
      </div>
      <p>CNPJ: {cnpj}</p>
      <p>Nome Fantasia: {fantasyName}</p>
      <p>Endereço: {address}</p>
    </div>
  )
}