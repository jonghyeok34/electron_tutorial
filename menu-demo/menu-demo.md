# Application menu

application menu :menu that is on the top of the window

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

  | tag     | description              |
  | ------- | ------------------------ |
  | label   | shown label              |
  | submenu | submenu                  |
  | role    | use predefined functions |
  | type    | use predefined elements  |
  | click   | add function when click  |

# context menu

```
menu which appears when right click
```

## main.js

```javascript
const electron = require("electron");

const app = electron.app;
...
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
...

function createWindow() {
  ...
}

app.on("ready", function() {
  createWindow();
  ...

  const ctxMenu = new Menu();
  ctxMenu.append(
    new MenuItem({
      label: "Hello",
      click: function() {
        console.log("Context menu item clicked");
      }
    })
  );
  ctxMenu.append(
    new MenuItem({
      role: "selectall"
    })
  );
  win.webContents.on("context-menu", function (e, params) {
    /* params x, y helps menu to pop up on particular mouse position */
    ctxMenu.popup(win, params.x, params.y);
  });
});
...

```

1. create new menu
   ```javascript
   const ctxMenu = new Menu();
   ```
2. append menu item

   ```javascript
   // use label & click
   ctxMenu.append(
     new MenuItem({
       label: "Hello",
       click: function() {
         console.log("Context menu item clicked");
       }
     })
   );
   // use role
   ctxMenu.append(
     new MenuItem({
       role: "selectall"
     })
   );
   ```

3. add event on context-menu(right click)
   ```javascript
   win.webContents.on("context-menu", function(e, params) {
     /* params x, y helps menu to pop up on particular mouse position */
     ctxMenu.popup(win, params.x, params.y);
   });
   ```

# accelerator

accelerator is shortcut which executes only when window is focused.

## main.js

```js
...
const template = [
  ...,
  {
    label: "Help",
    submenu: [
      {
        label: "About Electron",
        click: function() {
          electron.shell.openExternal("http://electron.atom.io");
        },
        accelerator: "CmdOrCtrl + Shift + H"
      }
    ]
  }
];
```

# global shortcuts

```
global shortcuts is shortcut which executes even window is not focus.
```

## main.js

```js
const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;
let win;

function createWindow() {
  ...
}

app.on("ready", function() {
  createWindow();
  ...

  globalShortcut.register("Alt+1", function() {
    win.show();
  });
});

...
app.on("will-quit", function() {
  globalShortcut.unregisterAll();
});


...

```

1. import global shortcut

```js
const electron = require("electron");
const globalShortcut = electron.globalShortcut;
```

2. register and add function : window is open when push alt + 1

```js
globalShortcut.register("Alt+1", function() {
  win.show();
});
```

3. unregister all when quit window

```js
app.on("will-quit", function() {
  globalShortcut.unregisterAll();
});
```
