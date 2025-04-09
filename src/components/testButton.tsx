function TestButton(): JSX.Element {
  const handleSelectFolder = async () => {
    const result = await window.ipcRenderer.invoke("dialog:openFile");
    if (result) {
      window.ipcRenderer.send("log",`Selected folder: ${result.filePaths}`);
    }
  };
  
  return (
    <button
      onClick={handleSelectFolder}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Select Folder
    </button>
  );
}

export default TestButton;
