import common from './webpack.common.js';
import { merge } from 'webpack-merge';

const productionConfig = merge(common, {
    mode: 'production',
});

export default productionConfig;
