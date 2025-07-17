import { File } from "lucide-react";
import { HandlePageState } from "@/handlers";
export const FileViewButton = () => {
  const handleClick = () => {HandlePageState().setPageState("files");};
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#393939] text-gray-300 w-full"
      onClick={handleClick}
    >
      <File size={18} />
      File View
    </button>
  );
};
