const vm = require("vm");
const { R_OK } = require("fs").constants;
const fs = require("fs").promises;
const { SCRIPT_URL, BASE_FILE_PATH, USER_AGENT } = require("../constant/file");
const { getNeetWorkJs } = require("./get-js");

let smashUtils;

(async () => {
  await getNeetWorkJs(BASE_FILE_PATH, SCRIPT_URL);
  await runScript();
})();

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

    await fs.access(BASE_FILE_PATH, R_OK);
    let jsContent = await fs.readFile(BASE_FILE_PATH, { encoding: "utf8" });

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

module.exports = { getLog };
