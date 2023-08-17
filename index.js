// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { Wrapper } = require("enkanetwork.js");
const iconv = require("iconv-lite");
const { spawn } = require("child_process");

const createWindow = () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    // 在这里隐藏菜单栏
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 加载 index.html
  mainWindow.loadFile("./src/main.html");

  // 打开开发工具
  // Handle button clicks
  ipcMain.on("load-page", (event, page) => {
    // Read the content of the requested HTML file
    const pageContent = fs.readFileSync(`./src/${page}.html`, "utf-8");

    // Send the page content back to the renderer process
    event.reply("load-page-reply", pageContent);
  });

  //uid
  var SuperUid = 0;
  //charactorHeadImgArray
  var cHIA = [];
  //username
  var SuperUserName = "";
  //level
  var SuperLevel = 0;
  //UserHeadImg
  var SuperUserHeadImg = "";
  //charactersCard
  var SuperCharactersCardArray = [];

  //uid处理
  ipcMain.on("send-uid", (event, uid) => {
    //存储uid,判断是否为初次登陆
    if (uid != -1) {
      SuperUid = uid;
    } else {
      if (SuperUid == 0) {
        event.reply("sendUser", "name", 0, "");
      } else {
        event.reply("sendUser", SuperUserName, SuperLevel, SuperUserHeadImg);
      }
      return;
    }

    const client = new Wrapper();

    function bufferToUrlEncoded(buffer) {
      const hexArray = Array.from(buffer).map((byte) =>
        byte.toString(16).padStart(2, "0")
      );
      const encodedString = hexArray.map((hex) => `%${hex}`).join("");
      return encodedString;
    }

    //主页面底部
    client
      .getPlayer(uid)
      .then((UserInfo) => {
        //getName
        UserNameGBK = UserInfo.player.username;
        buffer = iconv.encode(UserNameGBK, "utf-8");
        URI = bufferToUrlEncoded(buffer);
        username = decodeURIComponent(URI);
        SuperUserName = username;

        //getLevel
        level = UserInfo.player.levels.rank;
        SuperLevel = level;

        //getHeadImg
        UserHeadImg = UserInfo.player.profilePicture.assets.icon;
        SuperUserHeadImg = UserHeadImg;
        event.reply("sendUser", username, level, UserHeadImg);

        //获取8个角色头像
        for (var i = 0; i < 8; i++) {
          cHIA.push(UserInfo.characters[i].assets.icon);
        }
        //获取角色卡片信息
        for (var i = 0; i < 8; i++) {
          SuperCharactersCardArray.push(UserInfo.characters[i]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });

  ipcMain.on("askForCharactorsHeadImg", (event) => {
    event.reply(
      "sendCharactorsHeadImg",
      cHIA[0],
      cHIA[1],
      cHIA[2],
      cHIA[3],
      cHIA[4],
      cHIA[5],
      cHIA[6],
      cHIA[7]
    );
  });

  //返回角色卡片信息
  ipcMain.on("askForCharacterCards", (event, index) => {
    event.reply("sendCharacterCards", SuperCharactersCardArray[index]);
  });

  //实现打开原神游戏功能
  ipcMain.on("open-game", (event, gamePath) => {
    //打开原神游戏
    //const gamePath = "C:\\Program Files\\Genshin Impact\\Genshin Impact Game\\GenshinImpact.exe";
    const childProcess = spawn(gamePath, [], {
      shell: false,
      detached: true,
      // stdio: "ignore",
    });

    childProcess.unref();
    console.log("game opened");

    childProcess.on("error", (err) => {
      console.error("Spawn error:", err);
    });
  });
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
