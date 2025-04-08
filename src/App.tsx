import "./global.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function App() {
  return (
    <div className="h-screen">
      <PanelGroup
        autoSaveId="test"
        direction="horizontal"
        className="h-full"
      >
        <Panel defaultSize={25}>
          <div className="h-full p-4 rounded-lg border-2 border-blue-500 bg-zinc-900 text-white font-bold overflow-auto">
            Directories
          </div>
        </Panel>
        <PanelResizeHandle className="w-[6px] bg-zinc-800 cursor-col-resize" />
        <Panel>
          <div className="h-full p-4 rounded-lg border-2 border-blue-500 bg-zinc-900 text-white font-bold overflow-auto">
            Files
          </div>
        </Panel>
        <PanelResizeHandle className="w-[6px] bg-zinc-800 cursor-col-resize" />
        <Panel defaultSize={25}>
          <div className="h-full p-4 rounded-lg border-2 border-blue-500 bg-zinc-900 text-white font-bold overflow-auto">
            Sorting Rules
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
