# Application menu

## main.js

```javascript
const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
let win;

function createWindow() {
  ...
}

app.on("ready", function() {
  createWindow();
  const template = [
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "demo",
      submenu: [
        {
          label: "submenu1",
          click: function() {
            console.log("Clicked submenu1");
          }
        },
        {
          type: "separator"
        },
        {
          label: "submenu2"
        }
      ]
    },
    {
      label: "Help",
      click: function() {
        electron.shell.openExternal("http://electron.atom.io");
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

...
```

## description

1. buildFromTemplate and setApplicationMenu

- build menu from template(array of menu info)
- set application menu from menu

```javascript
const electron = require("electron");
...
const Menu = electron.Menu;
...
app.on("ready", function() {
  createWindow();
  const template = [
    ...
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
```

2. template

```javascript
...
const template = [
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "demo",
      submenu: [
        {
          label: "submenu1",
          click: function() {
            console.log("Clicked submenu1");
          }
        },
        {
          type: "separator"
        },
        {
          label: "submenu2"
        }
      ]
    },
    {
      label: "Help",
      click: function() {
        electron.shell.openExternal("http://electron.atom.io");
      }
    }
  ];
});
```

- attributes
  | tag | description |
  |--- | ----------|
  |label| shown label |
  |submenu | submenu |
  |role | use predefined functions|
  |type | use predefined elements|
  |click| add function when click|
