const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = (env, argv) => {
    const config = {
        entry: {
            main: './src/index.js',
        },
        output: {
            filename: '[name]_bundle.js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: '[name]_bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
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
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body',
                filename: 'index.html',
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    };

    if (argv.mode === 'development') {
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

