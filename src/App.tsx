import "@/global.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  SideBar,
  FileDisplay,
  DraggableTopBar,
  TestButton,
  SelectDirButton,
  DirectoriesPreview,
} from "@/components";

export const App = () => {
  return (
    <>
      <DraggableTopBar />
      <div className="h-screen">
        <PanelGroup autoSaveId="test" direction="horizontal">
          <Panel defaultSize={25} minSize={15}>
            <SideBar>
              <DirectoriesPreview />
              <SelectDirButton />
            </SideBar>
          </Panel>
          <PanelResizeHandle className=" border-white/5 border hover:border-white/15" />
          <Panel>
            <FileDisplay>
              <TestButton />
            </FileDisplay>
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
};
