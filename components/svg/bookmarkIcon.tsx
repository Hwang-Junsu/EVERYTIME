import {motion} from "framer-motion";

const activatedSvg = {
    start: {fill: "rgba(3,138,255,0)", stroke: "black"},
    end: {
        fill: "rgba(159, 124, 255, 1)",
        stroke: "rgba(159, 124, 255, 1)",
    },
};

const deactivatedSvg = {
    start: {
        fill: "rgba(159, 124, 255, 1)",
        stroke: "rgba(159, 124, 255, 1)",
    },
    end: {fill: "rgba(3,138,255,0)", stroke: "black"},
};

export default function BookmarkIcon({activated}: {activated: boolean}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-7 h-7"
        >
            <motion.path
                variants={activated ? activatedSvg : deactivatedSvg}
                initial={"start"}
                animate={"end"}
                transition={{duration: 0.2}}
                strokeWidth="1.5"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
        </svg>
    );
}
