import cookieParser from 'cookie-parser';
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const publicPath = process.env.PUBLIC_URL || '/';
const openBrowser = process.env.OPEN_BROWSER === 'false' ? false : publicPath + '/pass-av-barn';

const developmentConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist_development',
        port: 8080,
        open: openBrowser,
        client: {
            overlay: false,
        },
        devMiddleware: { publicPath: publicPath },
        historyApiFallback: {
            index: publicPath,
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8001',
                on: {
                    proxyReq: (proxyReq, req) => {
                        const rawCookie = req.headers.cookie;
                        const match = rawCookie
                            ?.split(';')
                            .find((c) => c.trim().startsWith('localhost-idtoken='));
                        const cookieValue = match?.split('=').slice(1).join('=').trim();
                        if (cookieValue) {
                            proxyReq.setHeader('Authorization', `Bearer ${cookieValue}`);
                        }
                    },
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
            __NODE_ENV__: JSON.stringify('development'),
        }),
    ],
});

export default developmentConfig;
