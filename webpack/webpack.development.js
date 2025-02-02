import cookieParser from 'cookie-parser';
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const publicPath = process.env.PUBLIC_URL || '/';
const openBrowser = process.env.OPEN_BROWSER === 'false' ? false : publicPath + '/tilsyn-barn';

const developmentConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist_development',
        port: 8080,
        open: openBrowser,
        devMiddleware: { publicPath: publicPath },
        historyApiFallback: {
            index: publicPath,
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8001',
                onProxyReq: (proxyReq, req) => {
                    const cookieValue = req.cookies['localhost-idtoken'];
                    if (cookieValue) {
                        proxyReq.setHeader('Authorization', `Bearer ${cookieValue}`);
                    }
                },
            },
        ],
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }
            devServer.app.use(cookieParser());
            return middlewares;
        },
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
