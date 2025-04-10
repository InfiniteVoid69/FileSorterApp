import { useState, useEffect } from "react";

function TestButton(): JSX.Element {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  // Load saved folders on component mount
  useEffect(() => {
    const loadFolders = async () => {
      const savedFolders = await window.ipcRenderer.invoke(
        "store:get",
        "savedFolders"
      );
      setSelectedFolders(savedFolders);
    };
    loadFolders();
  }, []);

  const handleSelectFolder = async () => {
    const result = await window.ipcRenderer.invoke("dialog:openFile");
    if (result && result.filePaths) {
      const updatedFolders = [...selectedFolders, ...result.filePaths];
      setSelectedFolders(updatedFolders);
      // Stores Data
      await window.ipcRenderer.invoke(
        "store:set",
        "savedFolders",
        updatedFolders
      );
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSelectFolder}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
      >
        Select Folder
      </button>
      <button
        onClick={async () => {
          const x = await window.ipcRenderer.invoke(
            "store:get",
            "savedFolders"
          );
          console.log("All Folders:", x);
          window.ipcRenderer.send("log", {
            message: "All Folders:",
            data: x,
          });
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-lg ml-2"
      >
        Log All
      </button>
      <button
        onClick={async () => {
          const x = await window.ipcRenderer.invoke("store:return");
          window.ipcRenderer.send("log", {
            message: "Data Dump:",
            data: x,
          });
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-lg ml-2"
      >
        Data Dump
      </button>
      <button
        onClick={async () => {
          await window.ipcRenderer.invoke("store:clear");
          const loadFolders = async () => {
            const savedFolders = await window.ipcRenderer.invoke(
              "store:get",
              "savedFolders"
            );
            setSelectedFolders(savedFolders);
          };
          loadFolders();
        }}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-lg ml-2"
      >
        Clear
      </button>
      <div className="mt-4">
        <strong>Selected Folders:</strong>
        <ul className="list-disc pl-5">
          {selectedFolders.map((folder, index) => (
            <li key={index} className="flex items-center">
              {folder}
              <button
                onClick={() => {
                  const updatedFolders = selectedFolders.filter(
                    (_, i) => i !== index
                  );
                  setSelectedFolders(updatedFolders);
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TestButton;
