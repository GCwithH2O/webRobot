const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');

//设置nodejs环境变量
//模式：development,production
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, "src"),
                use: [
                    'babel-loader',
                    {
                        //webpack5推荐的ESLintWebpackPlugin与mini-css-extract-plugin冲突，暂时使用即将废弃的eslint-loader
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    //注释掉"style-loader"，生成单独css文件，防止闪屏
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    /*
                        css兼容性处理:postcss
                        帮postcss找到.browserslistrc中browserslist配置，加载指定的css兼容性样式
                        "broswerslist": {
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            "production": [
                            ">1%",
                            "not dead",
                            "not op_mini all"
                            ]
                        },
                    */
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: "postcss-loader",
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.(html|htm)$/,
                use: [{
                    loader: "html-loader",
                    // options: {
                    //     root: path.resolve(__dirname, 'src'),
                    //     attrs: ['img:src', 'link:href']
                    // }
                }]
            },
            {
                exclude: /\.(css|js|less|html|png|jpg|jpeg|gif)$/,
                loader: "file-loader",
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        //与mini-css-extract-plugin冲突，暂时使用即将废弃的eslint-loader
        // new ESLintWebpackPlugin({
        //     eslintPath: path.resolve(__dirname, "src"),
        // })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 5000,
        open: true,
        hot: true,
        watchContentBase: true,
    }
}