import { Folder } from "lucide-react";
import { HandlePageState } from "@/handlers";
export const FolderViewButton = () => {
  const { setPageState } = HandlePageState();
  const handleClick = () => {
    setPageState("dirs");
  };
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#393939] text-gray-300 w-full"
      onClick={handleClick}
    >
      <Folder size={18} />
      Folders
    </button>
  );
};
