const https = require("https");
const fs = require("fs");
const path = require("path");

const getNeetWorkJs = async (p, url) => {
  const JS_REGEX = /smash-h5\/index\.js":(([\d\D])+?(!function([\d\D])+?)},"\.\/node_modules)/gim;

  let jsContent = await httpGet(url);
  let matchResult = JS_REGEX.exec(jsContent);
  if (matchResult && matchResult.length != 0) {
    jsContent = matchResult[3];
  }

  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, jsContent);
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
