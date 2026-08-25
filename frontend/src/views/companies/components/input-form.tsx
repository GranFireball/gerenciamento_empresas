import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import InputError from "./input-error";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  defaultValue?: string
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  defaultValue = ""
}: FormFieldProps<T>) {
  return (
    <div>
      <label>{label}</label>
      <br />

      <input {...register(name)} className="border-1 p-2 rounded-sm" defaultValue={defaultValue}/>
      <br/>
      {error && <InputError message={error.message} />}
    </div>
  );
}