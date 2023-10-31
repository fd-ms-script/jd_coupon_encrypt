require("module-alias/register");
const { getLog } = require("@/utils/get-encrypt.js");
const http = require("http");
const { URL } = require("url");
const port = 3000;

const serverFn = (request, response) => {
  const { host } = request.headers;
  const parseUrl = new URL(request.url, `http://${host}`);
  const url = parseUrl.pathname;

  if (url == "/log") {
    let body = getLog();
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    body.then((item) => {
      response.end(JSON.stringify(item));
    });
  }
};

http.createServer(serverFn).listen(port);

console.log("Server running at http://127.0.0.1:" + port + "/");
