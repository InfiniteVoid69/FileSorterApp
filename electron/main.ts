import { app, BrowserWindow, ipcMain, dialog, nativeImage } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "fs";
import path from "path";
import Store from "electron-store";

const nutsack = new Store();

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1050,
    height: 650,
    center: true,
    frame: false,
    vibrancy: "under-window",
    visualEffectState: "active",
    titleBarStyle: 'hidden',
    trafficLightPosition: {x: 15, y: 10},
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

// Handle IPC events



// File selection thingy
ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog(win!, {
    properties: ["openDirectory"],
  });

  if (result.canceled) {
    return null;
  }
  return result;
});

//Terminal logging shit
ipcMain.on("log", (_, message) => {
  console.log("\x1b[36m", "Log:", message);
});

// Getting Files from dir list
ipcMain.handle("getFilesFromDir", async (_, dir) => {
  try {
    const files = fs.readdirSync(dir).map((file) => {
      //If file is a directory, return dir
      return path.join(dir, file);
    });
    return files;
  }
  catch (err) { 
    console.error(`Error Reading Dir ${dir}`, err);
    return [];
  }
});

//Getting Icon
ipcMain.handle("getFileIcon", async (_, filePath) => {
  try {
    const icon = nativeImage.createFromPath(filePath);
    return icon.toDataURL();
  } catch (error) {
    console.error(`Error fetching icon for file: ${filePath}`, error);
    return null;
  }
});

// DataHandler shit
// Might use this or might use sqlite3 or something else idk...
ipcMain.handle("store:get", (_, key) => {
  return nutsack.get(key, []);
});

ipcMain.handle("store:set", (_, key, value) => {
  nutsack.set(key, value);
   if (key === "savedFolders") {
    win?.webContents.send("store:updated", { key, value });
  }
});

ipcMain.handle("store:delete", (_, key) => {
  nutsack.delete(key);
});

ipcMain.handle("store:clear", () => {
  nutsack.clear();
  console.log("\x1b[36m", "Log:", "\x1b[31m", "Cleared all data from store");
});

ipcMain.handle("store:return", () => {
  return nutsack.store;
});