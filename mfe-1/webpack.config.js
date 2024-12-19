const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:4000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4000,
    // historyApiFallback: true,
    // watchFiles: [path.resolve(__dirname, "src")],
    // onListening: function (devServer) {
    //   const port = devServer.server.address().port;

    //   printCompilationMessage("compiling", port);

    //   devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
    //     setImmediate(() => {
    //       if (stats.hasErrors()) {
    //         printCompilationMessage("failure", port);
    //       } else {
    //         printCompilationMessage("success", port);
    //       }
    //     });
    //   });
    // },

    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "*",
    //   "Access-Control-Allow-Headers": "*",
    //   "Sec-Fetch-Site": "cross-origin",
    // },
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
      name: "mfe_1",
      filename: "remoteEntry.js",
      // remotes: {},
      exposes: {
        "./button": "./src/button",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
  ],
  // optimization: {
  //   minimize: false,
  // },
});
