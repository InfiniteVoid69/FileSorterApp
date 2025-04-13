import { useState, useEffect } from "react";

export const SelectedFolders = () => {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  useEffect(() => {
    const loadFolders = async () => {
      const savedFolders = await window.ipcRenderer.invoke(
        "store:get",
        "savedFolders"
      );
      setSelectedFolders(savedFolders || []);
    };
    loadFolders();

    //update idk pls work
    const handleStoreUpdate = (_: unknown, { key, value }: { key: string; value: string[] }) => {
      if (key === "savedFolders" && Array.isArray(value)) {
        setSelectedFolders(value);
      }
    };

    window.ipcRenderer.on("store:updated", handleStoreUpdate);

    return () => {
      window.ipcRenderer.off("store:updated", handleStoreUpdate);
    };
  }, []);

  const handleSelectFolder = async () => {
    const result = await window.ipcRenderer.invoke("dialog:openFile");
    if (result && result.filePaths) {
      if (result.filePaths.some((filePath: string) => selectedFolders.includes(filePath))) {
        console.error("One or more selected folders already exist.");
        return;
      }
      const updatedFolders = [...selectedFolders, ...result.filePaths];
      setSelectedFolders(updatedFolders);
      //save to nutsack
      await window.ipcRenderer.invoke("store:set", "savedFolders", updatedFolders);
    }
  };

  return { selectedFolders, handleSelectFolder };
};
