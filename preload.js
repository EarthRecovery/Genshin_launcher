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
    ipcRenderer.on("sendUser", (event, UserName, level, UserHeadImg) => {
      //set name
      const contentDiv = document.getElementById("name");
      contentDiv.innerHTML = UserName;

      //set level
      const contentDiv2 = document.getElementById("level");
      contentDiv2.innerHTML = "level: " + level;

      //set headimg
      const contentDiv3 = document.getElementById("headimg");
      contentDiv3.style.backgroundImage =
        "url(https://enka.network/ui/" + UserHeadImg + ".png)";
    });
  },
  //原神启动
  openGame: () => {
    const gameOpenBtn = document.getElementById("gameOpenBtn");
    const gamePath =
      // "C:\\Users\\earth_recovery\\Desktop\\Games\\YuanShen.exe.lnk";
      // "C:\\Users\\earth_recovery\\Desktop\\0dcloud.lnk";
      "D:\\Genshin\\Genshin Impact\\Genshin Impact Game\\YuanShen.exe";
    gameOpenBtn.addEventListener("click", () => {
      ipcRenderer.send("open-game", gamePath);
    });
  },
});
