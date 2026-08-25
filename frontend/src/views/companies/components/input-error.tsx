interface InputErrorProps {
  message?: string;
}

export default function InputError({
  message = "Campo inválido"
}: InputErrorProps){
  return (
    <span className="text-red-500">{message}</span>
  )
}