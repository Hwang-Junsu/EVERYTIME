import {motion} from "framer-motion";

const activatedSvg = {
    start: {fill: "rgba(3,138,255,0)", stroke: "black"},
    end: {
        fill: "rgba(231, 109, 137, 1)",
        stroke: "rgba(231, 109, 137, 1)",
    },
};

const deactivatedSvg = {
    start: {
        fill: "rgba(231, 109, 137, 1)",
        stroke: "rgba(231, 109, 137, 1)",
    },
    end: {fill: "rgba(231, 109, 137, 0)", stroke: "black"},
};

export default function HeartIcon({activated}: {activated: boolean}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="cursor-pointer w-7 h-7"
        >
            <motion.path
                variants={activated ? activatedSvg : deactivatedSvg}
                initial={"start"}
                animate={"end"}
                transition={{duration: 0.2}}
                strokeWidth="1.5"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    );
}
