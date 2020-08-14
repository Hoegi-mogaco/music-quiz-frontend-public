const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const apiMocker = require("connect-api-mocker");

const constants = require("./src/webpack/directoryConstants");
const banner = require(`${constants.WEBPACK_DIR}/banner`);
const entry = require(`${constants.WEBPACK_DIR}/entry`);
const htmlPlugins = require(`${constants.WEBPACK_DIR}/html-webpack-plugin`);

const mode = process.env.NODE_ENV || "development";

console.log(entry);
module.exports = {
  mode,
  entry,
  output: {
    filename: "[name].js?[contentHash]",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(mode === "production"),
    }),
    ...htmlPlugins,
    new CleanWebpackPlugin(),
  ],
  devServer: {
    before: (app, server, compiler) => {
      app.use(apiMocker("/api", "mocks/api"));
    },
  },
};
