const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

const common = require("./webpack.common.js")

module.exports = {
  ...common,
  mode: "production",
  entry: "./lib/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "react-layered-image",
    libraryTarget: "umd",
  },
  devtool: "source-map",
  externals: {
    react: "react",
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "types/LayeredImage.d.ts",
          to: "index.d.ts",
        },
      ],
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  ],
}
