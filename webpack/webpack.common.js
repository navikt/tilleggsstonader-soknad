import * as child from 'child_process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const publicPath = process.env.PUBLIC_URL || '/';

const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();

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
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Søknad om tilleggsstønader',
            template: path.join(process.cwd(), 'src/frontend/index.html'),
        }),
        new webpack.DefinePlugin({
            __PUBLIC_URL__: JSON.stringify(publicPath),
            __COMMIT_HASH__: JSON.stringify(commitHash),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default common;
