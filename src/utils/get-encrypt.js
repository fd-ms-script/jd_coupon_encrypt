const vm = require("vm");
const { R_OK } = require("fs").constants;
const fs = require("fs").promises;
const { SCRIPT_URL, BASE_FILE_PATH } = require("../constant/file");
const { getNeetWorkJs } = require("./get-js");

const UA = "okhttp/3.12.1;jdmall;android;version/9.5.4;build/88136;screen/1440x3007;os/11;network/wifi;";

let smashUtils;

(async () => {
  await getNeetWorkJs(BASE_FILE_PATH, SCRIPT_URL);
  await runScript();
})();

async function runScript() {
  try {
    process.chdir(__dirname);

    await fs.access(BASE_FILE_PATH, R_OK);
    const jsContent = await fs.readFile(BASE_FILE_PATH, { encoding: "utf8" });

    const fnMock = new Function();

    const ctx = {
      window: { addEventListener: fnMock },
      document: {
        addEventListener: fnMock,
        removeEventListener: fnMock,
        cookie: undefined,
      },
      navigator: { userAgent: UA },
    };

    vm.createContext(ctx);
    vm.runInContext(jsContent, ctx);

    smashUtils = ctx.window.smashUtils;
    smashUtils.init();
  } catch (e) {
    console.log(e);
  }
}

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
  console.log(o);

  return JSON.parse(o);
}

function getBodyArray(count, logId) {
  const itemArray = [];
  for (let i = 0; i < count; i++) {
    const ss = getLog(logId);
    itemArray.push(ss);
  }
  return itemArray;
}

module.exports = { getLog, getBodyArray };
