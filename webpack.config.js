const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = (env, argv) => {
    const isDevMode = argv.mode !== 'production';
    const config = {
        entry: {
            'js/main': './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevMode ? '[name].js' : '[name]_[contenthash:6].js',
            chunkFilename: isDevMode ? 'js/[name].js' : 'js/[name]_[contenthash:6].js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isDevMode ? '[name].[ext]' : '[name]_[hash:6].[ext]',
                                outputPath: 'images/',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                inject: 'body',
                filename: 'index.html',
            }),

            // create hashes to be based on the relative path of the module
            // prevent hash change for vendors bundle if it was not modified
            new webpack.HashedModuleIdsPlugin(),
        ],
        optimization: {
            // runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },
    };

    if (isDevMode) {
        config.devtool = 'source-map';
    }

    if (env && env.reload) {
        config.plugins.push(new LiveReloadPlugin());
    }

    if (env && env.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};

