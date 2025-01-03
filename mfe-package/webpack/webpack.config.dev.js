const path = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

const { plugins } = require("./webpack.plugins");

const { port, publicPath } = require("./constants");

const currentDir = path.resolve(process.cwd());

const config = {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(currentDir, "dist"),
    clean: true,
    publicPath,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Sec-Fetch-Site": "cross-origin",
    },
    watchFiles: [path.resolve(currentDir, "src")],
    hot: true, // For hot reloading if needed
    open: true, // Automatically open the browser
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins,
};

const startDevServer = () => {
  const devServerConfig = config.devServer;

  const compiler = webpack(config);

  // Use webpackDevServer for proper server functionality
  const server = new webpackDevServer(devServerConfig, compiler);

  server.start().then(() => {
    console.log("Dev server is running at http://localhost:4010");
  });
};

module.exports = { startDevServer };
