const openBtn = document.getElementById("openBtn");
const shell = require("electron").shell;

//get current directory
const current_dir = document.URL.split("/")
  .slice(0, -1)
  .join("/");
openBtn.addEventListener("click", function(event) {
  shell.showItemInFolder(`${current_dir}\\static\\demo.txt`);
  shell.openItem(`${current_dir}\\static\\liveen-logo.png`);
  shell.openExternal("https://electronjs.org/");
});
