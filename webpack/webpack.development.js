import common from './webpack.common.js';
import { merge } from 'webpack-merge';
import path from 'path';

const developmentConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist_development',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(process.cwd(), 'dist_development'),
        publicPath: '/',
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
});

export default developmentConfig;
