// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { Wrapper } = require("enkanetwork.js");
const iconv = require("iconv-lite");

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

  //uid处理
  ipcMain.on("send-uid", (event, uid) => {
    const client = new Wrapper();

    function bufferToUrlEncoded(buffer) {
      const hexArray = Array.from(buffer).map((byte) =>
        byte.toString(16).padStart(2, "0")
      );
      const encodedString = hexArray.map((hex) => `%${hex}`).join("");
      return encodedString;
    }

    client
      .getPlayer(uid)
      .then((UserInfo) => {
        //getName
        UserNameGBK = UserInfo.player.username;
        buffer = iconv.encode(UserNameGBK, "utf-8");
        URI = bufferToUrlEncoded(buffer);
        username = decodeURIComponent(URI);

        //getLevel
        level = UserInfo.player.levels.rank;

        //getHeadImg
        UserHeadImg = UserInfo.player.profilePicture.assets.icon;
        event.reply("sendUser", username, level, UserHeadImg);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });

  // mainWindow.webContents.openDevTools()
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
