const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

const { name, exposes, shared, dependencies } = require("./constants");

exports.plugins = [
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
];
