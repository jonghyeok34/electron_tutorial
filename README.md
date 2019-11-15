# 1. Hello-world

0. file tree

```
index.html
main.js
package.json
```

1. install electron

```
npm install electron --save-dev
```

2. package.json

```javascript

{
    "name": "hello-world",
    "version": "1.0.0",
    "main": "main.js",
    "devDependencies": {
        "electron": "^7.1.1"
    },
    "scripts": {
        "start": "electron ."
    }
}
```

3. main.js

```javascript
console.log("main process working");

const electron = require("electron");

// run js, handle events
const app = electron.app;
// ui related part
const BrowserWindow = electron.BrowserWindow;

// load url
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    })
  );
  // open dev tool
  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
```

4. index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>hello world app</title>
  </head>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

5. start file

```cmd
npm start
```
