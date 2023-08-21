import path from 'path'

const config = {
    entry: './src/frontend/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.join(process.cwd(), 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default config;