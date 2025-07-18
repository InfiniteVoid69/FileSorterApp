import { useState } from "react";

export const HandlePageState = () => {
  const [page, setPage] = useState("dirs");

  const setPageState = (newPage: string) => {
    setPage(newPage);
    console.log("Navigating to:", newPage); // dumb debug
    window.ipcRenderer.send("log", {
      message: "Navigating to: " + newPage,
    });
  };

  return { page, setPageState };
};
