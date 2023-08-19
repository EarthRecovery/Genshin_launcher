const iconv = require("iconv-lite");
const { Wrapper } = require("enkanetwork.js");
const client = new Wrapper();
client
  .getPlayer(148196994)
  .then((UserInfo) => {
    UserHeadImg = UserInfo.characters[0].assets.icon;
    console.log(UserHeadImg);
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });

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
