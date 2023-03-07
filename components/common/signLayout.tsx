import Image from "next/legacy/image";
import {motion} from "framer-motion";
import LoginImage from "../../images/loginImage.jpg";

const container = {
  hidden: {opacity: 0, y: 100},
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: {opacity: 0, y: 100},
  show: {opacity: 1, y: 0},
};

export default function SignLayout({children}) {
  return (
    <div className="flex gap-10 w-screen justify-center">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="w-[500px] hidden lg:flex justify-center items-center flex-col gap-3"
      >
        <motion.div
          variants={item}
          className="text-3xl text-indigo-400 drop-shadow-xl mr-10"
        >
          EveryTime!
        </motion.div>
        <motion.div
          variants={item}
          className="text-3xl text-indigo-400 drop-shadow-xl ml-10"
        >
          EveryWhere!
        </motion.div>
        <motion.div variants={item} className="relative w-[400px] h-[500px]">
          <Image src={LoginImage} layout="fill" alt="image" />
        </motion.div>
        <motion.div
          variants={item}
          className="text-4xl text-bold tracking-tighter"
        >
          EVERYTIME
        </motion.div>
      </motion.section>
      <section>{children}</section>
    </div>
  );
}
