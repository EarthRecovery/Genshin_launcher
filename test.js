// const iconv = require("iconv-lite");
// const { Wrapper } = require("enkanetwork.js");
// const client = new Wrapper({
//   language: "zh-CN",
// });
// client
//   .getPlayer(148196994)
//   .then((UserInfo) => {
//     console.log(UserInfo);
//   })
//   .catch((error) => {
//     console.error("Error fetching user data:", error);
//   });

// const { EnkaClient } = require("enka-network-api");
// const enka = new EnkaClient({ defaultLanguage: "en" });

// run();

// async function run() {
//   const uid = 825436941;
//   const user = await enka.fetchUser(uid);

//   const characters = user.characters;

//   if (characters.length === 0) {
//     console.log("This user has no detailed characters on the profile.");
//     return;
//   }

//   for (const char of characters) {
//     const name = char.characterData.name.get();
//     const level = char.level;
//     const maxLevel = char.maxLevel;
//     const statsList = char.stats.statProperties.map((stats) => {
//       return ` - ${stats.fightPropName.get()}: ${stats.valueText}`;
//     });

//     console.log(`${name} - Lv.${level}/${maxLevel}\n${statsList.join("\n")}`);
//   }

//   enka.close();
// }

// const { spawn } = require("child_process");

// const childProcess = spawn(
//   "D:\\Genshin\\Genshin Impact\\launcher.exe",
//   // "D:\\VScode\\Microsoft VS Code\\Code.exe",
//   // "D:\\chorme\\spacesniffer_1_3_0_2 (2)\\SpaceSniffer.exe",
//   // "D:\\typora\\Typora\\Typora.exe",
//   // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//   // "D:\\Genshin\\Genshin Impact\\Genshin Impact Game\\YuanShen.exe",
//   [],
//   {
//     shell: false,
//     detached: true,
//     // stdio: "ignore",
//   }
// );

// childProcess.unref();
// console.log("game opened");

// childProcess.on("error", (err) => {
//   console.error("Spawn error:", err);
// });

// const fs = require("fs");

// // 读取本地JSON文件
// fs.readFile("./src/cache.json", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading JSON file:", err);
//     return;
//   }
//   try {
//     const data = JSON.parse(data);
//     if (data.uid != 0) {
//       SuperUid = data.uid;
//       SuperUserName = data.name;
//       SuperLevel = data.lv;
//       SuperUserHeadImg = data.userHeadImg;
//       cHIA = data.cHIA;
//       SuperCharactersCardArray = data.charactersInfo;
//       //test
//       console.log(SuperCharactersCardArray);
//     }
//   } catch (parseError) {
//     console.error("Error parsing JSON:", parseError);
//   }
// });

// const express = require("express");
// const app = express();

// // 添加 CORS 头部中间件
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // 允许任何来源访问
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 允许的请求方法
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   ); // 允许的请求头部
//   next();
// });

// const axios = require("axios");

// // 替换成你要请求的API的URL
// const apiUrl = "https://enka.network/api/uid/148196994";

// axios
//   .get(apiUrl)
//   .then((response) => {
//     // 在这里处理返回的JSON数据
//     const jsonData = response.data;
//     console.log(jsonData);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// const headers = new Headers();
// headers.append("authority", "enka.network");
// headers.append("method", "GET");
// headers.append("path", "/api/uid/618285856");
// headers.append("scheme", "https");
// headers.append(
//   "Accept",
//   "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
// );
// headers.append("Accept-Encoding", "gzip, deflate, br");
// headers.append(
//   "Accept-Language",
//   "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
// );
// headers.append("Cache-Control", "max-age=0");
// headers.append(
//   "Cookie",
//   "globalToggles=eyJ1aWQiOnRydWUsIm5pY2tuYW1lIjp0cnVlLCJkYXJrIjpmYWxzZSwic3Vic3RhdHMiOmZhbHNlfQ; locale=zh-CN"
// );
// headers.append("Referer", "https://api.enka.network/");
// headers.append(
//   "Sec-Ch-Ua",
//   '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"'
// );
// headers.append("Sec-Ch-Ua-Mobile", "?0");
// headers.append("Sec-Ch-Ua-Platform", '"Windows"');
// headers.append("Sec-Fetch-Dest", "document");
// headers.append("Sec-Fetch-Mode", "navigate");
// headers.append("Sec-Fetch-Site", "same-site");
// headers.append("Sec-Fetch-User", "?1");
// headers.append("Upgrade-Insecure-Requests", "1");
// headers.append(
//   "User-Agent",
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203"
// );

// fetch("https://enka.network/api/uid/618285856", {
//   method: "GET",
//   headers: headers,
// })
//   .then((response) => {
//     const customHeaderValue = response.headers.get("Custom-Header");
//     console.log("Custom Header Value:", customHeaderValue);
//     return response.text();
//   })
//   .then((response) => {
//     // 处理响应数据
//     return response.text(); // 例如，使用 response.text() 获取文本数据
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://enka.network/api/uid/618285856", true);

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       console.log(xhr.responseText);
//     } else {
//       console.error("Request failed:", xhr.statusText);
//     }
//   }
// };

// xhr.send();

const fs = require("fs");

// const filePath = "./src/cache.json";

// fs.readFile("./src/cache.json", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading JSON file:", err);
//     return;
//   }
//   if (data == "") {
//     return;
//   }
//   try {
//     const CharacterCards = JSON.parse(data).charactersInfo[0];
//     console.log(CharacterCards);
//   } catch (parseError) {
//     console.error("Error parsing JSON:", parseError);
//   }
// });

// const cacheJSON = {
//   uid: 114514,
// };

// const jsonString = JSON.stringify(cacheJSON, null, 2);

//将原来的cache.json清空
// 使用空字符串来清空文件内容
// fs.writeFile("./src/cache.json", "", (err) => {
//   if (err) {
//     console.error("Error clearing file:", err);
//   } else {
//     console.log("File cleared successfully.");
//   }
// });

// // 将字符串写入文件
// fs.writeFile("./src/cache.json", jsonString, "utf8", (err) => {
//   if (err) {
//     console.error("Error writing JSON file:", err);
//   } else {
//     console.log("JSON data has been written to data.json");
//   }
// });
filePath = "./src/cache.json";
fs.unlink(filePath, (unlinkErr) => {
  if (unlinkErr) {
    console.error("Error deleting file:", unlinkErr);
  } else {
    console.log("File deleted successfully.");

    // 添加新文件
    fs.writeFile(filePath, "", "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
      } else {
        console.log("New JSON data has been written to cache.json");
      }
    });
  }
});
