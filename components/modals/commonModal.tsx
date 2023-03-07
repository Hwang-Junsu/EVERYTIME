import {motion} from "framer-motion";
import {cls} from "@libs/utils";

export default function CommonModal({children, onClick}) {
  return (
    <div
      onClick={onClick}
      role="presentation"
      className="fixed z-[999] -top-3 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
    >
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
        className={cls(
          `p-5 w-[320px] phone:w-[400px] lg:w-[900px] h-[450px] phone:h-[600px] bg-white rounded-md overflow-scroll phone:overflow-hidden
`
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
