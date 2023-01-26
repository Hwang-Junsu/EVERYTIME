import { cls } from "@libs/utils";
import { motion } from "framer-motion";

export default function CommonModal({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      role="presentation"
      className="fixed z-[9999] -top-3 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
        className={cls(
          `p-5 min-w-[430px] lg:w-[900px] h-[600px] bg-white rounded-md overflow-hidden
`
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
