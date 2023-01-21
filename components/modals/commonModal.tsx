import {cls} from "@libs/utils";

export default function CommonModal({children, onClick}) {
    return (
        <div
            onClick={onClick}
            role="presentation"
            className="fixed z-[9999] top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                role="presentation"
                className={cls(
                    `p-5 min-w-[430px] lg:w-[900px] h-[600px] bg-white rounded-md overflow-hidden
`
                )}
            >
                {children}
            </div>
        </div>
    );
}
