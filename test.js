const iconv = require("iconv-lite");
const { Wrapper } = require("enkanetwork.js");

// 要转换的文本
// const utf8Text = "鏅烘収";

// // 将 UTF-8 转换为 GBK
// const gbkBuffer = iconv.encode(utf8Text, "gbk");

// // // 将 GBK 缓冲区转换回字符串
// // const gbkText = gbkBuffer.toString("binary");

// // console.log("UTF-8文本：", utf8Text);
// // console.log(gbkBuffer);

// // const encodedText = "%e6%99%ba%e6%85%a7";

// // // 解码 URL 编码的字符串
// // const decodedText = decodeURIComponent(encodedText);

// // console.log("解码后的UTF-8中文：", decodedText);

// const buffer = gbkBuffer;
// function bufferToUrlEncoded(buffer) {
//   const hexArray = Array.from(buffer).map((byte) =>
//     byte.toString(16).padStart(2, "0")
//   );
//   const encodedString = hexArray.map((hex) => `%${hex}`).join("");
//   return encodedString;
// }

// console.log(decodeURIComponent(bufferToUrlEncoded(buffer)));

// const client = new Wrapper();

// function bufferToUrlEncoded(buffer) {
//   const hexArray = Array.from(buffer).map((byte) =>
//     byte.toString(16).padStart(2, "0")
//   );
//   const encodedString = hexArray.map((hex) => `%${hex}`).join("");
//   return encodedString;
// }

// client
//   .getPlayer(148196994)
//   .then((UserInfo) => {
//     UserNameGBK = UserInfo.player.username;
//     buffer = iconv.encode(UserNameGBK, "utf-8");
//     console.log(buffer);
//     username = decodeURIComponent(bufferToUrlEncoded(buffer));
//     console.log(username);
//   })
//   .catch((error) => {
//     console.error("Error fetching user data:", error);
//   });

console.log(decodeURIComponent("%e6%99%ba%e6%85%a7"));
