var path = require("path");
var webpack = require("webpack");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var AutoDllPlugin = require("autodll-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { DEV, NODE_ENV } = require("./environment");
const IMG_HASH = DEV ? "" : "-[hash:6]";
const USE_CACHE = DEV ? "true" : "false";

var config = {
    devtool: "source-map",
    performance: {
        hints: false
    },
    entry: [
        "react-hot-loader/patch", // RHL patch
        path.resolve(__dirname, "./src/index.tsx")
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".css", ".scss", ".html"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[hash].bundle.js",
        chunkFilename: "js/[id].[hash].chunk.js",
        publicPath: "/"
    },
    mode: DEV ? "development" : "production",
    devServer: {
        historyApiFallback: true,
        port: 9000,
        hot: true,
        stats: "minimal",
        inline: true,
        contentBase: path.resolve(__dirname, "dist"),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    priority: -10
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loaders: [`awesome-typescript-loader?useCache=${USE_CACHE}`]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot|ico)$/,
                loader: `file-loader?name=assets/[name]${IMG_HASH}.[ext]`
            },
            {
                test: /\.(sa|sc|c)ss$/,
                loaders: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HardSourceWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, "./dist/**/*")]),
        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: "body",
            template: path.resolve(__dirname, "src/index.html")
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OptimizeCSSAssetsPlugin(),
        new AutoDllPlugin({
            inject: true,
            filename: "[name]_[hash].js",
            entry: {
                vendor: ["react", "react-dom", "react-router", "react-router-dom", "bootstrap"]
            },
            plugins: [new UglifyJsPlugin()]
        })
    ]
};

module.exports = config;
