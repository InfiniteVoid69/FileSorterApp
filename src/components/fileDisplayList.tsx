//TODO:
// Display Files from directory list
// Check if a dir has sort sub-folders selected
// Handle Hot Reload from directory list removal/additions
// Display in grid
// Different display types: icons, list, other(s) TBD

import { useEffect, useState } from "react";
import { SelectedFolders } from "@/handlers";

export const FileDisplayList = () => {
  const { selectedFolders } = SelectedFolders();
  const [files, setFiles] = useState<
    { name: string; path: string; icon?: string }[]
  >([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let allFiles: { name: string; path: string; icon?: string }[] = [];
        for (const dir of selectedFolders) {
          const dirFiles: string[] = await window.ipcRenderer.invoke(
            "getFilesFromDir",
            dir
          );
          const formattedFiles = await Promise.all(
            dirFiles
              .filter((filePath) => !filePath.endsWith(".DS_Store"))
              .map(async (filePath) => {
                const icon = await window.ipcRenderer.invoke(
                  "getFileIcon",
                  filePath
                );
                return {
                  name: filePath.split("/").pop() || filePath,
                  path: filePath,
                  icon,
                };
              })
          );
          allFiles = [...allFiles, ...formattedFiles];
        }
        setFiles(allFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [selectedFolders]); // Re-run when selectedFolders changes

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="mt-4">File Display</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {files.map(
          (
            file: { name: string; path: string; icon?: string },
            index: number
          ) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                {file.icon ? (
                  <img
                    src={file.icon}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm">📄</span>
                )}
              </div>
              <p className="text-sm mt-2">{file.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
