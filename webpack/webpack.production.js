import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const productionConfig = merge(common, {
    mode: 'production',
});

export default productionConfig;
