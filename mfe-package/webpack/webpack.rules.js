exports.rules = [
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
];
