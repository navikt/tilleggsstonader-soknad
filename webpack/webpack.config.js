import path from 'path'

const config = {
    entry: './src/frontend/index.js',
    output: {
        filename: 'main.js',
        path: path.join(process.cwd(), 'dist'),
    },
};

export default config;