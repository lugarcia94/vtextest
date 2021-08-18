const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');


const config = {
    entry: {
        appmservice: './src/index.js',
        quickview: './src/pages/quickview/index.js',
        vendor: ['whatwg-fetch', 'slick-carousel', 'jquery'],
    },
    output: {
        path: path.resolve(__dirname, './deploy'),
        filename: '[name].js'
    },
    mode: 'production', // none, development or production(default)
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Core: path.resolve(__dirname, './src/core')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./[name].css"
        }),
        new webpack.ProvidePlugin({
            Promise: "bluebird"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor"
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    plugins: ["transform-runtime", "react-html-attrs"],
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                new IconfontWebpackPlugin(loader),
                                require('postcss-inline-svg')(),
                                require('autoprefixer')({
                                    grid: true
                                }),
                                require('cssnano')({
                                    zindex: false
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                new IconfontWebpackPlugin(loader),
                                require('postcss-inline-svg')(),
                                require('autoprefixer')({
                                    grid: true
                                }),
                                require('cssnano')({
                                    zindex: false
                                })
                            ]
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            import: path.resolve(__dirname, './src/core/index.styl')
                        }

                    }

                ]

            },
        ]
    },
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    performance: {
        hints: false
    },
    // devtool: 'source-map'
};

module.exports = config;
