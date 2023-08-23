import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const common = {
    entry: './src/frontend/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                    onlyCompileBundledFiles: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env'], ['@babel/preset-react']],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Søknad om tilleggsstønader',
            template: path.join(process.cwd(), 'src/frontend/index.html'),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default common;
