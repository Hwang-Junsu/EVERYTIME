import { motion } from "framer-motion";

const activatedSvg = {
  start: { stroke: "transparents", fill: "none", pathLength: 0 },
  end: {
    pathLength: 1,
    stroke: "rgba(159, 124, 255, 1)",
    fill: "none",
  },
};

export default function Loading() {
  return (
    <div className="fixed inset-0 opacity-50 bg-slate-200 z-[9999]">
      <div className="flex items-center justify-center w-full h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-40 h-40"
        >
          <motion.path
            variants={activatedSvg}
            initial={"start"}
            animate={"end"}
            transition={{ repeat: Infinity, duration: 2 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      </div>
    </div>
  );
}
