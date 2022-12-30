import {v4 as uuid} from "uuid";

export default function Hashtags({hashtags}: {hashtags: string}) {
    return (
        <div className="space-x-2 text-sm text-blue-400">
            {hashtags &&
                hashtags.split(",").map((tag) => (
                    <span key={uuid()} className="cursor-pointer">
                        {`#${tag}`}
                    </span>
                ))}
        </div>
    );
}
