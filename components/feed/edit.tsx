import { IEditMenu } from "types/types";

export default function EditMenu({ onDelete, onBookmark, isMine }: IEditMenu) {
  return (
    <div className="right-2 absolute z-[999] w-[100px] h-[50px] bg-white shadow-2xl rounded-xl border-2 overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        {isMine ? (
          <div
            onClick={onDelete}
            className="flex items-center justify-center flex-grow w-full text-sm font-bold text-center text-red-500 hover:cursor-pointer hover:bg-blue-200 "
          >
            삭제하기
          </div>
        ) : (
          <div
            onClick={onBookmark}
            className="flex items-center justify-center flex-grow w-full text-sm font-bold hover:cursor-pointer hover:bg-blue-200"
          >
            북마크설정
          </div>
        )}
      </div>
    </div>
  );
}
