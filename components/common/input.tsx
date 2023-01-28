import { cls } from "@libs/utils";
import { UseFormRegisterReturn } from "react-hook-form";
import { IInputProps } from "types/types";

export default function Input({
  register,
  type,
  textAlign = "right",
  placeholder = "",
}: IInputProps) {
  return (
    <input
      className={cls(
        `bg-white text-${textAlign} appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
      )}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
}
