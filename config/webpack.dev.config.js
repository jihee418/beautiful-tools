'use strict'
const path = require('path');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //진입점 자동매핑용
const webpack = require('webpack')
const config = require('./config')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',//chunk[id], 디버깅 코드등 영향있음
    output: { //엔트리 내용 빌드경로 및 결과 파일 위치 지정
        filename: './[name].js', // 엔트리 파일명명규칙
        chunkFilename: '[id].js', // chunk파일 명명 규칙 // --mode development에서는 [id]에도 chunkName들어감 - [name]옵션은 이름이 너무 길게나옴
        publicPath: '/' // Devserver의 핫 리로드 기능을 이용하려면 이 옵션 필요
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Devserver의 핫 리로드 기능을 이용하려면 이 옵션 필요
        // html 자동 바인딩
        new HtmlWebpackPlugin({
            filename: path.join('./', 'index.html'),
            template: path.join('src', 'index.html'),
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({
            env : merge(config.common.env, config.dev.env)
        }),
    ],
    devServer: {
        compress: false,
        port: 9000,
        historyApiFallback: true
    },
})

module.exports = devWebpackConfig
