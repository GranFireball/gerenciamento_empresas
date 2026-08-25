interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  color?: "black" | "green" | "red" | "blue";
}

export default function Button({
  onClick,
  text,
  disabled = false,
  color = "black"
}: ButtonProps){
  const colors = {
    blue: "border-blue-500 hover:text-blue-500",
    black: "border-black-500 hover:text-black-500",
    red: "border-red-500 hover:text-red-500",
    green: "border-green-500 hover:text-green-500",
  };

  return (
    <button
      className={`p-2 border-1 rounded-md cursor-pointer ${colors[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}