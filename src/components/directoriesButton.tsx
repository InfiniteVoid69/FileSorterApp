import { SelectedFolders } from "@/handlers";

export const SelectDirButton = () => {
  const { handleSelectFolder } = SelectedFolders();
  return (
    <div className="p-4">
      <button
        onClick={handleSelectFolder}
        className="flex items-center gap-2 py-2 cursor-pointer text-blue-500 hover:text-blue-600"
      >
        Add Folder
      </button>
    </div>
  );
};