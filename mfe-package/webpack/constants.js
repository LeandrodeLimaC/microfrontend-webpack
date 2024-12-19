const path = require("path");

const {
  name,
  version,
  port,
  entry = ["./src/index.tsx"],
  publicPath = `http://localhost:${port}/`,
  exposes,
  shared = {},
  dependencies,
} = {
  ...require(path.resolve(process.cwd(), "package.json")),
  ...require(path.resolve(process.cwd(), "microfrontend.config.js")),
};

module.exports = {
  name,
  version,
  port,
  entry,
  publicPath,
  exposes,
  shared,
  dependencies,
};
