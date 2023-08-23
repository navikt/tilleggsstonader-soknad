import common from './webpack.common.js';
import { merge } from 'webpack-merge';
import path from 'path';

const publicPath = process.env.PUBLIC_URL || '/';

const developmentConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist_development',
        port: 8080,
        open: publicPath,
        devMiddleware: { publicPath: publicPath },
        historyApiFallback: {
            index: publicPath,
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
});

export default developmentConfig;
