'use strict'
const path = require('path')
const merge = require('webpack-merge')
var webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //진입점 자동매핑용
const config = require('./config')

const prodWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production', //chunk[id], 디버깅 코드등 영향있음
    watch: false,
    cache: false,
    output: { //엔트리 내용 빌드경로 및 결과 파일 위치 지정
        publicPath: '/dist/' // 배포시에 dist를 바라보게해야함
    },
    plugins: [
        // html 자동 바인딩
        new HtmlWebpackPlugin({
            filename: path.join('../', 'index.html'),
            template: path.join('src', 'index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new webpack.DefinePlugin({
            env : merge(config.common.env, config.prod.env)
        }),
    ],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'async', //initial - static파일만 분리 , async - 동적로딩파일만 분리, all - 모두 분리
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5, //병렬 요청 chunk수
            maxInitialRequests: 3, //초기 페이지로드 병렬 요청 chunk수
            automaticNameDelimiter: '_', //vendor, default등 prefix 구분문자 (default : '~')
            name: true, //development모드일때 파일에 청크이름 표시여부
            cacheGroups: {
                default: {
                    minChunks: 2, //2개 이상의 chunk
                    priority: -20,
                    reuseExistingChunk: true //minChunks이상에서 사용할경우 공통사용
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    }
})

module.exports = prodWebpackConfig
