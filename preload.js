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
      console.log(UserName);
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
  //请求发送角色头像
  askForCharactersHeadImg: () => {
    ipcRenderer.send("askForCharactorsHeadImg");
  },
  //发送角色头像
  setCharactersHeadImg: () => {
    ipcRenderer.on(
      "sendCharactorsHeadImg",
      (event, c1, c2, c3, c4, c5, c6, c7, c8) => {
        const headImg1 = document.getElementById("c1");
        const headImg2 = document.getElementById("c2");
        const headImg3 = document.getElementById("c3");
        const headImg4 = document.getElementById("c4");
        const headImg5 = document.getElementById("c5");
        const headImg6 = document.getElementById("c6");
        const headImg7 = document.getElementById("c7");
        const headImg8 = document.getElementById("c8");
        headImg1.style.backgroundImage =
          "url(https://enka.network/ui/" + c1 + ".png)";
        headImg2.style.backgroundImage =
          "url(https://enka.network/ui/" + c2 + ".png)";
        headImg3.style.backgroundImage =
          "url(https://enka.network/ui/" + c3 + ".png)";
        headImg4.style.backgroundImage =
          "url(https://enka.network/ui/" + c4 + ".png)";
        headImg5.style.backgroundImage =
          "url(https://enka.network/ui/" + c5 + ".png)";
        headImg6.style.backgroundImage =
          "url(https://enka.network/ui/" + c6 + ".png)";
        headImg7.style.backgroundImage =
          "url(https://enka.network/ui/" + c7 + ".png)";
        headImg8.style.backgroundImage =
          "url(https://enka.network/ui/" + c8 + ".png)";
      }
    );
  },
  //请求发送角色卡片
  askForCharacterCards: (i) => {
    ipcRenderer.send("askForCharacterCards", i);
  },
  //接受角色卡片信息
  sendCharacterCards: () => {
    ipcRenderer.on("sendCharacterCards", (event, CharacterCards) => {
      // console.log(CharacterCards.constellationsList[0].assets);
    });
  },
});
