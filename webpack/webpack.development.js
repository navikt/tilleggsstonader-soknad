import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const publicPath = process.env.PUBLIC_URL || '/';
const brukMockLokalt = process.env.BRUK_MOCK_LOKALT && {
    '/api': 'http://localhost:8001'
};

console.log(`publicPath=${publicPath}`)
console.log(`brukMockLokalt=${process.env.BRUK_MOCK_LOKALT}`)

const developmentConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist_development',
        port: 8080,
        open: publicPath + '/barnetilsyn',
        devMiddleware: { publicPath: publicPath },
        historyApiFallback: {
            index: publicPath,
        },
        proxy: brukMockLokalt
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(process.cwd(), 'dist_development'),
        publicPath: publicPath,
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
});

export default developmentConfig;
