const path = require("path");

module.exports = {
  mode: "production",
  entry: "./carousel.jsx",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  externals: {
    react: "react",
  },
};
