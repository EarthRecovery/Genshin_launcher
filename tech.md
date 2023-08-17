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

### 原神角色卡

```json
Characters {
  characterId: 10000025,
  properties: Properties {
    xp: PropertyContent { type: 1001, val: '' },
    ascension: PropertyContent { type: 1002, val: '5' },
    level: PropertyContent { type: 4001, val: '80' },
    stamina: PropertyContent { type: 10010, val: '23200' }
  },
  stats: Stats {
    baseHp: Stat { value: 9059.529296875 },
    hpPercentage: StatPercentage { value: 0.30880001187324524 },   
    baseAtk: Stat { value: 579.4840087890625 },
    atkPercentage: StatPercentage { value: 0.6270999908447266 },   
    baseDef: Stat { value: 671.415283203125 },
    defPercentage: StatPercentage { value: 0.24780000746250153 },  
    critRate: StatPercentage { value: 0.46289998292922974 },       
    critDamage: StatPercentage { value: 0.8044999837875366 },      
    energyRecharge: StatPercentage { value: 1.9983652830123901 },  
    healingBonus: StatPercentage { value: '0' },
    incomingHealingBonus: StatPercentage { value: '0' },
    elementalMastery: Stat { value: 123.54999542236328 },
    physicalRes: StatPercentage { value: '0' },
    physicalDamageBonus: StatPercentage { value: '0' },
    pyroDamageBonus: StatPercentage { value: '0' },
    electroDamageBonus: StatPercentage { value: '0' },
    hydroDamageBonus: StatPercentage { value: 0.6460000276565552 },
    dendroDamageBonus: StatPercentage { value: '0' },
    anemoDamageBonus: StatPercentage { value: '0' },
    geoDamageBonus: StatPercentage { value: '0' },
    cryoDamageBonus: StatPercentage { value: '0' },
    pyroRes: StatPercentage { value: '0' },
    electroRes: StatPercentage { value: '0' },
    hydroRes: StatPercentage { value: '0' },
    dendroRes: StatPercentage { value: '0' },
    anemoRes: StatPercentage { value: '0' },
    geoRes: StatPercentage { value: '0' },
    cryoRes: StatPercentage { value: '0' },
    pyroEnergyCost: Stat { value: '' },
    electroEnergyCost: Stat { value: '' },
    hydroEnergyCost: Stat { value: 80 },
    dendroEnergyCost: Stat { value: '' },
    anemoEnergyCost: Stat { value: '' },
    cryoEnergyCost: Stat { value: '' },
    geoEnergyCost: Stat { value: '' },
    cooldownReduction: StatPercentage { value: '0' },
    shieldStrength: StatPercentage { value: '0' },
    currentPyroEnergy: Stat { value: '' },
    currentElectroEnergy: Stat { value: '' },
    currentHydroEnergy: Stat { value: 80 },
    currentDendroEnergy: Stat { value: '' },
    currentAnemoEnergy: Stat { value: '' },
    currentCryoEnergy: Stat { value: '' },
    currentGeoEnergy: Stat { value: '' },
    currentHp: Stat { value: 17366.0703125 },
    maxHp: Stat { value: 17366.0703125 },
    atk: Stat { value: 1240.87841796875 },
    def: Stat { value: 944.281982421875 }
  },
  constellationsList: [
    Constellations {
      id: 251,
      name: 'The Scent Remained',
      assets: [ConstellationImages]
    },
    Constellations {
      id: 252,
      name: 'Rainbow Upon the Azure Sky',
      assets: [ConstellationImages]
    },
    Constellations {
      id: 253,
      name: 'Weaver of Verses',
      assets: [ConstellationImages]
    },
    Constellations {
      id: 254,
      name: 'Evilsoother',
      assets: [ConstellationImages]
    },
    Constellations {
      id: 255,
      name: 'Embrace of Rain',
      assets: [ConstellationImages]
    },
    Constellations {
      id: 256,
      name: 'Hence, Call Them My Own Verses',
      assets: [ConstellationImages]
    }
  ],
  skillDepotId: 2501,
  inherentProudSkillList: [ 252101, 252201, 252301 ],
  skills: Skills {
    normalAttacks: Skill {
      level: 4,
      id: 10381,
      assets: [SkillImages],
      name: 'Normal Attack: Guhua Style'
    },
    elementalSkill: Skill {
      level: 8,
      id: 10382,
      assets: [SkillImages],
      name: 'Guhua Sword: Fatal Rainscreen'
    },
    elementalBurst: Skill {
      level: 8,
      id: 10385,
      assets: [SkillImages],
      name: 'Guhua Sword: Raincutter'
    }
  },
  skillsExtraLevel: { '2532': 3, '2539': 3 },
  equipment: Equipment {
    artifacts: [ [Artifact], [Artifact], [Artifact], [Artifact], [Artifact] ],
    weapon: Weapon {
      weaponId: 11401,
      level: 80,
      ascensionLevel: 5,
      refinement: [Refinement],
      nameTextMapHash: '2474354867',
      stars: 4,
      weaponStats: [Array],
      itemType: 'ITEM_WEAPON',
      assets: [WeaponImages],
      name: 'Favonius Sword'
    }
  },
  friendship: Friendship { level: 4 },
  assets: CharacterImages {
    icon: 'UI_AvatarIcon_Xingqiu',
    sideIcon: 'UI_AvatarIcon_Side_Xingqiu',
    gachaIcon: 'UI_Gacha_AvatarImg_Xingqiu',
    constellations: [
      'UI_Talent_S_Xingqiu_01',
      'UI_Talent_S_Xingqiu_02',
      'UI_Talent_U_Xingqiu_01',
      'UI_Talent_S_Xingqiu_03',
      'UI_Talent_U_Xingqiu_02',
      'UI_Talent_S_Xingqiu_04'
    ],
    talents: CharacterSkillIcons {
      normalAttack: 'Skill_A_01',
      elementalSkill: 'Skill_S_Xingqiu_01',
      elementalBurst: 'Skill_E_Xingqiu_01'
    },
    costumes: []
  },
  costumeId: '',
  name: 'Xingqiu'
}
```

需要的数据：

name: 'Ganyu'

level: PropertyContent { type: 4001, val: '90' },

```
```

