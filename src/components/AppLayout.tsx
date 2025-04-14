import { ReactNode } from "react";

export const DraggableTopBar = () => {
  return <header className="absolute inset-0 h-8 bg-transparent" />
}

interface Props {
  children?: ReactNode;
}

export const SideBar = ({children}: Props ) => {
  return (
    <div className="h-full p-2 mt-8 text-white overflow-auto">
      {children}
    </div>
  );
};

export const FileDisplay = ({children}: Props ) => {
  return (
    <div className="h-full p-2 bg-zinc-800 text-white overflow-auto">
      {children}
    </div>
  );
};