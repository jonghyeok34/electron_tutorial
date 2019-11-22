# Shell 
## directory 

```
- static
    - demo.txt
    - liveen-logo.png
- index.html
- index.js
- main.js

```
## files
1. index.html
   ```html
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Shell demo App</title>
    </head>
    <body>
        <h1>Shell module</h1>
        <button id="openBtn">Open</button>
        <script>
            require('./index.js')
        </script>
    </body>
    </html>
   
   ```
2. index.js
    ```js
    const openBtn = document.getElementById("openBtn");
    
    // import electron shell
    const shell = require("electron").shell;

    //get current directory
    const current_dir = document.URL.split("/").slice(0, -1).join("/");

    openBtn.addEventListener("click", function(event) {
        // show item
        shell.showItemInFolder(`${current_dir}\\static\\demo.txt`);
        // open item
        shell.openItem(`${current_dir}\\static\\liveen-logo.png`);
        // open url
        shell.openExternal("https://electronjs.org/");
    });

    ```
