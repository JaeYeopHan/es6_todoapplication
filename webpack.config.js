const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        ]
    },
    devServer: {
        publicPath: "/dist/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};