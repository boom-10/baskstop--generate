// TODO:
// 1. "referenceUrl": "file:///Users/jiangdong.chen/Desktop/node/backStopTest/backstop_data/ref_html/ref_vite.html",
// 2. 可选项：
//   1. delay
//   2. misMatchThreshold
//   3. cookiePath
//   4. notHaveHeader 画稿上不具有header，但是实际情况有header,需要处理则设置为true
//   5. statusBar 画稿上具有手机状态栏，但是实际情况下无法截入，需要处理则设置为true
// 3. 默认项
//   1. selectorExpansion：是否截取所有匹配的选择器事例，默认为true
//   2. misMatchThreshold：默认为1
//   3. requireSameDimensions: 默认为false
//   4. cookiePath:需要配置的cookie

// 开发者会传入一个[{},{}],用户的必填项为label和url
const fs = require("fs");
const path = require("path");

const defaultConfig = {
  selectorExpansion: true,
  misMatchThreshold: 1,
  requireSameDimensions: false,
  url: "",
  cookiePath: "backstop_data/engine_scripts/cookies.json",
};

let configs = [];

//初始化config，并且添加referenceUrl
const initConfig = () => {
  const createHtml = require("./insertHtml");
  const imgPath = path.resolve(__dirname, "../backstop_data/ref_img/");
  const htmlPath = `file://${path.resolve(
    __dirname,
    "../backstop_data/ref_html/"
  )}`;

  // 本地变量中插入referenceUrl
  return createHtml(imgPath)
    .then((labelArr) => {
      console.log("create Html:", labelArr);
      const filteredArr = labelArr
        .filter((item) => item !== undefined)
        .map((htmlName) => {
          configs.push({
            ...defaultConfig,
            label: htmlName.substring(0, htmlName.lastIndexOf(".")),
            referenceUrl: path.join(htmlPath, htmlName),
          });
        });
      if (filteredArr.length == 0) throw new Error("请添加画稿");
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

//处理必选项
const handleRequired = () => {
  return new Promise((resolve, reject) => {
    const requiredPath = path.join(__dirname, "../backstopConfig.json");

    if (!fs.existsSync(requiredPath)) {
      console.error("File not found:", requiredPath);
      return reject(new Error("File not found"));
    }

    fs.readFile(requiredPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return reject(err);
      }
      try {
        const requiredFile = JSON.parse(data);
        requiredFile.forEach((reqItem) => {
          const extraParams = Object.keys(reqItem).filter(
            (key) => key !== "label" && key !== "url"
          );
          configs.forEach((configItem) => {
            if (reqItem.label === configItem.label) {
              configItem.url = reqItem.url;
              //处理可选项
              if (extraParams.length > 0) {
                console.log(
                  `Extra parameters for label ${reqItem.label}:`,
                  extraParams
                );
                extraParams.forEach((param) => {
                  handleOption(param, configItem, reqItem);
                });
              }
            }
          });
        });
        resolve();
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        reject(parseErr);
      }
    });
  });
};
//处理可选项
const handleOption = (param, configItem, reqItem) => {
  if (param === "notHaveHeader" && reqItem.notHaveHeader) {
    configItem.onReadyScript = "forReady/handleNoHeader.js";
    configItem.removeSelectors = [".header"];
    return;
  }
  if (param === "statusBar" && reqItem.statusBar) {
    return;
  }
  configItem[param] = reqItem[param];
};

//修改backstop.json文件
const setBackstopJson = () => {
  const configPath = path.join(__dirname, "../backstop.json");
  const configFile = require(configPath);
  configFile.scenarios = configs;
  fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2), "utf-8");
  console.log("backstopJson updated.");
};

const main = () => {
  initConfig()
    .then(() => handleRequired())
    .then(() => {
      console.log(configs);
      setBackstopJson();
    })
    .catch((error) => {
      console.error("Error handling initConfig:", error);
    });
};

main();
