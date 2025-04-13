import { SelectedFolders } from "@/handlers";

export const SelectDirButton = () => {
  const { handleSelectFolder } = SelectedFolders();
  return (
    <div className="p-4">
      <button
        onClick={handleSelectFolder}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Folder
      </button>
    </div>
  );
};