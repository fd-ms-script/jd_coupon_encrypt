const vm = require("vm");
const { R_OK } = require("fs").constants;
const fs = require("fs");
const { SCRIPT_URL, BASE_FILE_PATH, USER_AGENT } = require("@/constant/file");
const { default: axios } = require("axios");
const path = require("path");

let smashUtils;

const getNeetWorkJs = async (filePath, url) => {
  const res = await axios.get(url);

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, res.data);
};

async function getLog(logId) {
  logId = logId || "coupon_receive";

  var t = smashUtils.getRandom(8);
  var e = smashUtils.get_risk_result({
    id: logId,
    data: {
      random: t,
    },
  }).log;

  var o = JSON.stringify({
    log: e || -1,
    random: t,
  });

  return JSON.parse(o);
}

async function runScript() {
  try {
    process.chdir(__dirname);

    await fs.accessSync(BASE_FILE_PATH, R_OK);
    let jsContent = await fs.readFileSync(BASE_FILE_PATH, { encoding: "utf8" });

    const ctx = {
      window: { addEventListener: new Function() },
      document: {
        addEventListener: new Function(),
        removeEventListener: new Function(),
        cookie: undefined,
      },
      navigator: { userAgent: USER_AGENT },
    };

    vm.createContext(ctx);
    vm.runInContext(jsContent, ctx);

    smashUtils = ctx.window.smashUtils;
    smashUtils.init();
  } catch (e) {
    console.log("脚本运行错误", e);
  }
}

(async () => {
  await getNeetWorkJs(BASE_FILE_PATH, SCRIPT_URL);
  await runScript();
})();

module.exports = { getLog };
