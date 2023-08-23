import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const publicPath = process.env.PUBLIC_URL || '/';

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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.PUBLIC_URL': JSON.stringify(publicPath),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default common;
