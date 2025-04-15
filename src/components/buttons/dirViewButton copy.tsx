import { Folder } from "lucide-react";

export const FolderViewButton = () => {
    const handleSettingsClick = () => {};
    return (
      <button
        className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#393939] text-gray-300 w-full"
        onClick={handleSettingsClick}
      >
        <Folder size={18} />
        Folders
      </button>
    );
  };
  