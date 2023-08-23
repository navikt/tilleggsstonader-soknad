import path from 'path';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const productionConfig = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.join(process.cwd(), 'dist_production'),
        publicPath: '/',
        clean: true,
    },
    devtool: 'source-map',
});

export default productionConfig;
