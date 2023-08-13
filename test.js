const iconv = require("iconv-lite");
const { Wrapper } = require("enkanetwork.js");
const client = new Wrapper();
client
  .getPlayer(148196994)
  .then((UserInfo) => {
    UserHeadImg = UserInfo.player.profilePicture.assets.icon;
    console.log(UserHeadImg);
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });
