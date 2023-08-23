import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const productionConfig = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});

export default productionConfig;
