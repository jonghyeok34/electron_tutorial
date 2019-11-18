console.log("From renderer 1");
const BrowserWindow = require("electron").remote.BrowserWindow;

const path = require("path");
const url = require("url");
const newWindowBtn = document.getElementById("newWindowBtn");

newWindowBtn.addEventListener("click", e => {
  let winThree = new BrowserWindow();
  winThree.loadURL(
    url.format({
      pathname: path.join(__dirname, "three.html"),
      protocol: "file",
      slashes: true
    })
  );
  // dev tool 켜줌( chrome)
  winThree.webContents.openDevTools();
});
