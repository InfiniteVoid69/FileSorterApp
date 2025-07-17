import { useState } from "react";

export const HandlePageState = () => {
  const [page, setPage] = useState("files");

  const setPageState = (newPage: string) => {
    setPage(newPage);
  };

  
  return { page, setPageState };
};