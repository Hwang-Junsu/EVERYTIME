import {cls} from "@libs/utils";
import {IButtonProps} from "types/types";

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: IButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        "w-full bg-indigo-500 hover:bg-indigo-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm "
      )}
    >
      {text}
    </button>
  );
}
