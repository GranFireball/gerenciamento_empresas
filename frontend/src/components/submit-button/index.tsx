interface SubmitButtonProps {
  text?: string;
  isLoading: boolean;
}

export default function SubmitButton({
  text = "Confirmar",
  isLoading
}: SubmitButtonProps){
  return (
    <button
      className="p-2 border-1 border-green-500 rounded-md cursor-pointer hover:text-green-500 mt-8"
      type="submit"
      disabled={isLoading}
    >
      {text}
    </button>
  )
}