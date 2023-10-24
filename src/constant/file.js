const path = require("path");

const SCRIPT_URL = "https://storage11.360buyimg.com/tower/babelnode/smash-h5-c7dc1ed802.js";

const BASE_FILE_PATH = `${process.cwd()}/encrypt/${path.basename(SCRIPT_URL)}`;

const USER_AGENT = "okhttp/3.12.1;jdmall;android;version/9.5.4;build/88136;screen/1440x3007;os/11;network/wifi;";

module.exports = {
  SCRIPT_URL,
  BASE_FILE_PATH,
  USER_AGENT,
};
