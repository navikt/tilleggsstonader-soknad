import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Søknad om tilleggsstønader',
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.join(process.cwd(), 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default config;
