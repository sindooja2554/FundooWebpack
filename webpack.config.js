const webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css|sass)$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg(\?.*)?$/,
        issuer: "/src/component/Drawer.jsx$/",
        use: "svg-inline-loader",
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: ["url-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-url-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
    port: "3000",
  },
  devtool: "source-map",
};
