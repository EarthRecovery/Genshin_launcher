// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  sendToMain: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  addToContent: () => {
    ipcRenderer.on("load-page-reply", (event, pageContent) => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = pageContent;
    });
  },
  sendUID: (inputText) => {
    ipcRenderer.send("send-uid", inputText);
  },
  getUsername: () => {
    ipcRenderer.on("sendUsername", (event, UserName, level) => {
      //set name
      const contentDiv = document.getElementById("name");
      console.log(contentDiv);
      contentDiv.innerHTML = UserName;

      //set level
      const contentDiv2 = document.getElementById("level");
      console.log(contentDiv2);
      contentDiv2.innerHTML = "level: " + level;
    });
  },
});
