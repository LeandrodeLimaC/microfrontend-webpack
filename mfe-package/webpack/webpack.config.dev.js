const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const path = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server"); // Import the correct package

const currentDir = path.resolve(process.cwd());

const {
  name,
  port,
  publicPath,
  exposes,
  shared,
  dependencies,
} = require("./constants");

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

  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remoteEntry.js",
      exposes,
      shared: {
        ...shared,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react"].version,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-dom"].version,
        },
        microfrontend: { singleton: true },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
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
