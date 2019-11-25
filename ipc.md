# IPC(inter process communication) flow

```
|main| - open error dialog->         | renderer |
|    | <-- opened error dialog==     |          |
```

# Asynchronous IPC

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>IPC App</title>
  </head>
  <body>
    <h1>IPC</h1>
    <button id="asyncBtn">asyncBtn</button>
    <script type="module">
      import "./index.js";
    </script>
  </body>
</html>
```

## javascript

0. process : 0--> 1 --> 2 --> 3 -->4
1. index.js (renderer process)

```javascript
const electron = require("electron");
const ipc = electron.ipcRenderer; /* ipcRenderer */

const asyncBtn = document.getElementById("asyncBtn");

asyncBtn.addEventListener("click", function() {
  /* 0 */
  console.log("async msg 1");
  /* 1. send message to ipc asynchronously*/
  ipc.send("async-message");
  /* 2. */
  console.log("async msg 2");
});
/* 4.  receive event/argument and use*/
ipc.on("async-reply", function(event, arg) {
  console.log(arg);
});
```

2. main.js (main process)

```javascript
const electron = require("electron");
const ipc = electron.ipcMain; /* ipcMain */
const dialog = electron.dialog; /* event dialog */
...
/* 3. receive message and send event and arg to renderer */
ipc.on("async-message", function(event) {
  dialog.showErrorBox("An eror message", "Demo of an error message");
  event.sender.send("async-reply", "Main process opened the error dialog");
});
...
```

## dev console after click button

```
async msg 1
async msg 2
Main process opened the error dialog  -- execute asynchronously
```

# synchronous IPC

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>IPC App</title>
  </head>
  <body>
    <h1>IPC</h1>
    <button id="syncBtn">syncBtn</button>
    <script type="module">
      import "./index.js";
    </script>
  </body>
</html>
```

## javascript

1. main.js

```javascript
const electron = require("electron");

const ipc = electron.ipcMain;
const dialog = electron.dialog;

...

ipc.on("sync-message", function(event) {
  event.returnValue = "sync-reply";
});
...

```

2. index.js

```javascript
const electron = require("electron");
const ipc = electron.ipcRenderer;

const syncBtn = document.getElementById("syncBtn");
...

/* synchronous ipc */
syncBtn.addEventListener("click", function() {
  /* 1 */
  console.log("sync msg 1");
  /* 2 */
  const reply = ipc.sendSync("sync-message");
  console.log(reply);
  /* 3 */
  console.log("sync msg 2");
});

```

## dev console after click button

```
sync msg 1
sync-reply
sync msg 2
```

# remote window

## javascript

1. index.js

```javascript
const BrowserWindwow = electron.remote.BrowserWindow;
let window = new BrowserWindwow();
window.loadURL("http://github.com");
```

## what is different with ipc

1. remote window : handle ipc synchronously from main process --> not use async
