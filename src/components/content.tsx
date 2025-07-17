import { FileDisplayList, ListedDirectories } from "@/components";
import { HandlePageState } from "@/handlers";

export const Content = () => {
  const { page } = HandlePageState();

  return (
    <>
      {page === 'files' && <FileDisplayList />}
      {page === 'dirs' && <ListedDirectories />}
    </>
  );
};
