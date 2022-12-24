import { cls } from "@libs/utils";
import { Dispatch, SetStateAction } from "react";

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddModal({ children, isOpen, setIsOpen }: IModalProps) {
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            className={cls(
              `p-5 w-[480px] h-[350px] bg-white rounded-md
`
            )}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
