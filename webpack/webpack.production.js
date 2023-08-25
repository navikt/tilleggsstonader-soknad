import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const publicPath = process.env.PUBLIC_PATH || '/tilleggsstonader/soknad';

const productionConfig = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.join(process.cwd(), 'dist_production'),
        publicPath: publicPath,
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});

export default productionConfig;
