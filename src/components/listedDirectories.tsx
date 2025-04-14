import { SelectedFolders } from "@/handlers";
import { SelectDirButton } from "./directoriesButton";

export const listedDirectories = () => {
  const { selectedFolders } = SelectedFolders();
  return (
    <div className="mt-4">
      Selected Directories
      <ul>
        {selectedFolders.map((folder, index) => (
          <div
            className="px-2.5 py-3 hover:bg-zinc-500/75 transition-colors rounded-lg shadow-md"
            key={index}
          >
            <li key={index} className="flex items-center">
              {folder}
              <button
                onClick={() => {
                  const updatedFolders = selectedFolders.filter(
                    (_, i) => i !== index
                  );
                  window.ipcRenderer.invoke(
                    "store:set",
                    "savedFolders",
                    updatedFolders
                  );
                }}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                X
              </button>
            </li>
          </div>
        ))}
      </ul>
      <SelectDirButton />
    </div>
  );
};
