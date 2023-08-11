# 技术汇总

### electron 安装

npm init

cnpm install --save-dev electron

启动： npm start

### nrm

切换
如果要切换到 taobao 源，执行命令 nrm use taobao。
增加
你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 nrm add <registry> <url>，其中 registry 为源名，url 为源的路径。
删除
执行命令 nrm del <registry>删除对应的源。
测试速度
你还可以通过 nrm test <registry>测试响应源的响应时间。

### preload.js

由于无法在html使用js, 需要调用preload.js来实现函数，格式如下：

```js
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
});

```

这样就能在html中调用了

### 进程通信

使用ipcRenderer 发送消息到主进程

```js
ipcRenderer.send("load-page", page);
```

主进程接受并返回

```js
// Handle button clicks
  ipcMain.on("load-page", (event, page) => {
    // Read the content of the requested HTML file
    const pageContent = fs.readFileSync(`./src/${page}.html`, "utf-8");

    // Send the page content back to the renderer process
    event.reply("load-page-reply", pageContent);
  });
```

渲染进程接受

```js
ipcRenderer.on("load-page-reply", (event, pageContent) => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = pageContent;
    });
```

