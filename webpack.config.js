const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env) => ({
  entry: "./src/index.js",
  output: {
    filename: "main.[contenthash].js",
    publicPath: "/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.scss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Форма оплаты",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
    }),
  ],

  optimization: {
    minimizer: [
      "...",
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true, optimizationLevel: 3 }],
              ["imagemin-mozjpeg", { quality: 75, progressive: true }],
              ["imagemin-pngquant", { quality: [0.65, 0.8] }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
