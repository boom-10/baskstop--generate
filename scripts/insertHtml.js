const fs = require("fs");
const path = require("path");

const directoryPath = path.resolve(__dirname, "../backstop_data/ref_img/");

// 创建 HTML
const insertHtml = (file, name, statusBarObj) => {
  return new Promise((resolve, reject) => {
    const filePath = `./backstop_data/ref_html/${name}.html`;

    if (fs.existsSync(filePath)) {
      console.log(`${name}.html already exists, skipping creation.`);
      return resolve(null);
    }
    const marginTop = "margin-top: -50px;";
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <img src="../ref_img/${file}" alt="" />
  </body>
  <style>
    img {
      width: 100%;
      height: auto;
    }

    body {
      margin: 0px;
      padding: 0px;
      ${statusBarObj[name] ? marginTop : ""}
    }
  </style>
</html>
`;

    fs.writeFile(filePath, htmlContent, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return reject(err);
      } else {
        resolve(`${name}.html`);
      }
    });
  });
};

const hasStatusBar = () => {
  return new Promise((resolve, reject) => {
    const statusBarObj = {};

    fs.readFile("./backstopConfig.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("文件读取失败:", err);
        reject(err);
        return;
      }
      try {
        const data = JSON.parse(jsonString);
        data.forEach((item) => {
          if (item.statusBar) {
            statusBarObj[item.label] = true;
          }
        });
        resolve(statusBarObj);
      } catch (err) {
        console.log("JSON 解析失败:", err);
        reject(err);
      }
    });
  });
};

// 返回新增HTML名称
const createHtml = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return reject(new Error("Unable to scan directory: " + err));
      }
      hasStatusBar().then((statusBarObj) => {
        const promises = files.map((file) => {
          const name = file.substring(0, file.lastIndexOf("."));
          return insertHtml(file, name, statusBarObj);
        });

        Promise.all(promises)
          .then((results) => {
            resolve(results.filter((result) => result !== null));
          })
          .catch(reject);
      });
    });
  });
};

module.exports = createHtml;
