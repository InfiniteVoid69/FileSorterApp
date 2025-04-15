import "@/global.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  SideBar,
  FileDisplay,
  DraggableTopBar,
  TestButton,
  ListedDirectories,
  Content,
  SettingsButton,
  FileViewButton
} from "@/components";
import { FolderViewButton } from "./components/buttons/dirViewButton copy";
import { RuleViewButton } from "./components/buttons/ruleViewButton";

export const App = () => {
  return (
    <>
      <DraggableTopBar />
      <div className="h-screen">
        <PanelGroup autoSaveId="test" direction="horizontal">
          <Panel defaultSize={25} minSize={15}>
            <SideBar>
              <FileViewButton />
              <FolderViewButton />
              <RuleViewButton  />
              <SettingsButton />
            </SideBar>
          </Panel>
          <PanelResizeHandle className=" border-white/5 border hover:border-white/15" />
          <Panel>
            <FileDisplay>
              <Content />
              <ListedDirectories />
              <TestButton />
            </FileDisplay>
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
};
