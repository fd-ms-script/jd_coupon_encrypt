// webpack.config.js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index",
  target: "node",
  output: {
    filename: "jd_coupon.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      // umd 时是对象
      type: "commonjs2",
    },
  },
  optimization: {
    minimize: true, // 打包是否压缩代码
    minimizer: [
      new TerserPlugin({
        // 启用/禁用多进程并发运行功能。
        parallel: true,
        // 不将 注释 及 license 提取到单独的文件中
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        // 处理 .node 文件
        test: /\.node$/,
        loader: "node-loader",
        options: {
          name: ".node/[name].[contenthash:5].[ext]",
        },
      },
    ],
  },
};
