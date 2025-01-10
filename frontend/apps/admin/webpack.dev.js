const webpackCommon = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(webpackCommon, {
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: process.env.FRONTEND_ADMIN_DEVELOPMENT_PORT || 3010,
  },
});
