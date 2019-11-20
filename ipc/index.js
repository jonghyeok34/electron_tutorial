const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");
const syncBtn = document.getElementById("syncBtn");
/* asynchronous ipc */
asyncBtn.addEventListener("click", function() {
  console.log("async msg 1");
  ipc.send("async-message");
  console.log("async msg 2");
});

ipc.on("async-reply", function(event, arg) {
  console.log(arg);
});

/* synchronous ipc */
syncBtn.addEventListener("click", function() {
  console.log("sync msg 1");
  const reply = ipc.sendSync("sync-message");
  console.log(reply);
  console.log("sync msg 2");
});

/* remote window : handle ipc synchronously from main process*/
const BrowserWindwow = electron.remote.BrowserWindow;
let window = new BrowserWindwow();
window.loadURL("http://github.com");
