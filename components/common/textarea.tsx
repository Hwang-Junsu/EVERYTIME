import { ITextAreaProps } from "types/types";

export default function TextArea({
  label,
  name,
  placeholder,
  register,
  ...rest
}: ITextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        placeholder={placeholder}
        {...register}
        className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        rows={4}
        {...rest}
      />
    </div>
  );
}
