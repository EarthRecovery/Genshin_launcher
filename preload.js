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
  /**
   * 角色卡片
   * @param {*} i
   */
  //请求发送角色卡片
  askForCharacterCards: (i) => {
    ipcRenderer.send("askForCharacterCards", i);
  },
  //接受角色卡片信息
  CardRender: () => {
    ipcRenderer.on("sendCharacterCards", (event, CharacterCards) => {
      // 角色名字;
      const name = document.getElementById("name");
      name.innerHTML = CharacterCards.name;
      //角色等级
      const lv = document.getElementById("lv");
      lv.innerHTML = "Lv:90/" + CharacterCards.properties.level.val;
      //背景图片
      //查找背景元素
      //test
      console.log(CharacterCards.stats.currentDendroEnergy.value);
      function charEle(character) {
        if (
          character.stats.currentPyroEnergy.value > 0 ||
          character.stats.pyroEnergyCost.value > 0
        ) {
          return "pyro";
        } else if (
          character.stats.currentHydroEnergy.value > 0 ||
          character.stats.hydroEnergyCost.value > 0
        ) {
          return "hydro";
        } else if (
          character.stats.currentElectroEnergy.value > 0 ||
          character.stats.electroEnergyCost.value > 0
        ) {
          return "electro";
        } else if (
          character.stats.currentAnemoEnergy.value > 0 ||
          character.stats.anemoEnergyCost.value > 0
        ) {
          return "anemo";
        } else if (
          character.stats.currentCryoEnergy.value > 0 ||
          character.stats.cryoEnergyCost.value > 0
        ) {
          return "cryo";
        } else if (
          character.stats.currentGeoEnergy.value > 0 ||
          character.stats.geoEnergyCost.value > 0
        ) {
          return "geo";
        } else if (
          character.stats.currentDendroEnergy.value > 0 ||
          character.stats.dendroEnergyCost.value > 0
        ) {
          return "dendro";
        }
      }

      //TODO:背景图片根据角色属性调整
      const characterCard = document.getElementById("characterCard");
      characterCard.style.backgroundImage =
        "linear-gradient(to right,rgba(157, 157, 157, 0),rgba(255, 255, 255, 0.3),rgba(255, 255, 255, 0.3)),url('https://enka.network/ui/" +
        CharacterCards.assets.gachaIcon +
        ".png'),url('./assets/" +
        charEle(CharacterCards) +
        ".png')";

      //命座
      //TODO:命座发光
      const cs1 = document.getElementById("cs1");
      cs1.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[0] +
        ".png)";
      const cs2 = document.getElementById("cs2");
      cs2.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[1] +
        ".png)";
      const cs3 = document.getElementById("cs3");
      cs3.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[2] +
        ".png)";
      const cs4 = document.getElementById("cs4");
      cs4.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[3] +
        ".png)";
      const cs5 = document.getElementById("cs5");
      cs5.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[4] +
        ".png)";
      const cs6 = document.getElementById("cs6");
      cs6.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.constellations[5] +
        ".png)";
      //技能图片

      const sk1 = document.getElementById("sk1");
      sk1.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.talents.normalAttack +
        ".png)";
      const sk2 = document.getElementById("sk2");
      sk2.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.talents.elementalSkill +
        ".png)";
      const sk3 = document.getElementById("sk3");
      sk3.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.assets.talents.elementalBurst +
        ".png)";
      //技能等级
      const skillWord = document.getElementsByClassName("skillWord");
      skillWord[0].innerHTML = CharacterCards.skills.normalAttacks.level;
      skillWord[1].innerHTML = CharacterCards.skills.elementalSkill.level;
      skillWord[2].innerHTML = CharacterCards.skills.elementalBurst.level;
      //武器图片
      const weaponImg = document.getElementById("weapon-img");
      weaponImg.style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.weapon.assets.icon +
        ".png)";
      //武器名字
      const weaponName = document.getElementById("weapon-name");
      weaponName.innerHTML = CharacterCards.equipment.weapon.name;
      //武器等级
      const weaponLv = document.getElementById("weapon-lv");
      weaponLv.innerHTML = "Lv:90/" + CharacterCards.equipment.weapon.level;
      //角色属性
      const characterAttr = document.getElementsByClassName("statsNum");
      characterAttr[0].innerHTML = Math.floor(
        CharacterCards.stats.baseHp.value
      );
      characterAttr[1].innerHTML = Math.floor(
        CharacterCards.stats.baseAtk.value
      );
      characterAttr[2].innerHTML = Math.floor(
        CharacterCards.stats.baseDef.value
      );
      characterAttr[3].innerHTML = Math.floor(
        CharacterCards.stats.elementalMastery.value
      );
      characterAttr[4].innerHTML =
        Math.floor(CharacterCards.stats.critRate.value * 100) + "%";
      characterAttr[5].innerHTML =
        Math.floor(CharacterCards.stats.critDamage.value * 100) + "%";
      characterAttr[6].innerHTML =
        Math.floor(CharacterCards.stats.energyRecharge.value * 100) + "%";
      //特殊角色属性 TODO:根据角色属性调整
      //圣遗物图片
      artiImg = document.getElementsByClassName("artiImg");
      artiImg[0].style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.artifacts[0].icon +
        ".png)";
      artiImg[1].style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.artifacts[1].icon +
        ".png)";
      artiImg[2].style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.artifacts[2].icon +
        ".png)";
      artiImg[3].style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.artifacts[3].icon +
        ".png)";
      artiImg[4].style.backgroundImage =
        "url(https://enka.network/ui/" +
        CharacterCards.equipment.artifacts[4].icon +
        ".png)";
    });
  },
});
