export const TestButton = () => {
  return (
    <div className="p-4">
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
        }}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-lg ml-2"
      >
        Clear
      </button>
    </div>
  );
};
