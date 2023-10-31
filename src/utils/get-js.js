const https = require("https");
const fs = require("fs");
const path = require("path");

const getNeetWorkJs = async (filePath, url) => {
  let jsContent = await httpGet(url);

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, jsContent);
};

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.indexOf("http") !== 0 ? "https:" : "";
    const req = https.get(protocol + url, (res) => {
      res.setEncoding("utf-8");

      let rawData = "";

      res.on("error", reject);
      res.on("data", (chunk) => (rawData += chunk));
      res.on("end", () => resolve(rawData));
    });

    req.on("error", reject);
    req.end();
  });
}

module.exports = {
  getNeetWorkJs,
};
