const path = require("path");

const SCRIPT_URL = "https://storage11.360buyimg.com/tower/babelnode/smash-h5-c7dc1ed802.js";

const BASE_FILE_PATH = `${process.cwd()}/encrypt/${path.basename(SCRIPT_URL)}`;

module.exports = {
  SCRIPT_URL,
  BASE_FILE_PATH,
};
