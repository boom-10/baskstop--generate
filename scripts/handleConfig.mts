import * as fs from "fs";
import * as path from "path";
import createHtml from "./insertHtml.mts";
import { readFile, writeFile } from "fs/promises";

interface Config {
  selectorExpansion: boolean;
  misMatchThreshold: number;
  requireSameDimensions: boolean;
  url: string;
  cookiePath: string;
  label?: string;
  referenceUrl?: string;
  onReadyScript?: string;
  removeSelectors?: string[];
  [key: string]: any; // To allow additional properties
}

const defaultConfig: Config = {
  selectorExpansion: true,
  misMatchThreshold: 1,
  requireSameDimensions: false,
  url: "",
  cookiePath: "backstop_data/engine_scripts/cookies.json",
};

let configs: Config[] = [];

// Initialize config and add referenceUrl
const initConfig = async (): Promise<void> => {
  const imgPath = path.resolve("./backstop_data/ref_img/");
  const htmlPath = `file://${path.resolve("./backstop_data/ref_html/")}`;

  try {
    const labelArr: string[] = await createHtml(imgPath);
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

    if (filteredArr.length === 0) throw new Error("请添加画稿");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Handle required options
const handleRequired = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const requiredPath = path.join("./backstopConfig.json");

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
        const requiredFile: any[] = JSON.parse(data);
        requiredFile.forEach((reqItem) => {
          const extraParams = Object.keys(reqItem).filter(
            (key) => key !== "label" && key !== "url"
          );
          configs.forEach((configItem) => {
            if (reqItem.label === configItem.label) {
              configItem.url = reqItem.url;
              // Handle optional parameters
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

// Handle optional parameters
const handleOption = (
  param: string,
  configItem: Config,
  reqItem: any
): void => {
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

// Modify backstop.json file
const setBackstopJson = async (): Promise<void> => {
  const configPath = path.join("./backstop.json");

  try {
    // 读取 JSON 文件
    const data = await readFile(configPath, "utf-8");
    const configFile = JSON.parse(data);

    // 更新配置
    configFile.scenarios = configs; // 确保 `configs` 已定义

    // 写入更新后的 JSON 文件
    await writeFile(configPath, JSON.stringify(configFile, null, 2), "utf-8");
    console.log("backstopJson updated.");
  } catch (error) {
    console.error("Error updating backstopJson:", error);
  }
};

const main = async (): Promise<void> => {
  try {
    await initConfig();
    await handleRequired();
    console.log(configs);
    setBackstopJson();
  } catch (error) {
    console.error("Error handling initConfig:", error);
  }
};

main();
