// const iconv = require("iconv-lite");
// const { Wrapper } = require("enkanetwork.js");
// const client = new Wrapper();
// client
//   .getPlayer(148196994)
//   .then((UserInfo) => {
//     UserHeadImg = UserInfo.player.profilePicture.assets.icon;
//     console.log(UserHeadImg);
//   })
//   .catch((error) => {
//     console.error("Error fetching user data:", error);
//   });

const { spawn } = require("child_process");

const childProcess = spawn(
  "D:\\Genshin\\Genshin Impact\\launcher.exe",
  // "D:\\VScode\\Microsoft VS Code\\Code.exe",
  // "D:\\chorme\\spacesniffer_1_3_0_2 (2)\\SpaceSniffer.exe",
  // "D:\\typora\\Typora\\Typora.exe",
  // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  // "D:\\Genshin\\Genshin Impact\\Genshin Impact Game\\YuanShen.exe",
  [],
  {
    shell: false,
    detached: true,
    // stdio: "ignore",
  }
);

childProcess.unref();
console.log("game opened");

childProcess.on("error", (err) => {
  console.error("Spawn error:", err);
});
