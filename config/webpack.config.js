'use strict'
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const projectRoot = path.resolve(__dirname, '../') //프로젝트 루트

module.exports = {
    entry: { //string, object, array 가능 - 기본은 ./src
        //object 형태로 제작해야 output의 filename: [name].js 먹힘
        app: './src/index.js'
    },
    // entry: ['babel-polyfill', './src/index.js'],
    output: { //엔트리 내용 빌드경로 및 결과 파일 위치 지정
        path:  path.join(projectRoot, '/dist'),
        // publicPath: 'dist', //url-loader 를 사용할때 대입되는 경로 - 이미지등의 리소스 주소
        filename: '[name].[chunkhash].js', // 엔트리 파일명명규칙
        chunkFilename: '[id]_[chunkhash].js', // chunk파일 명명 규칙 // --mode development에서는 [id]에도 chunkName들어감 - [name]옵션은 이름이 너무 길게나옴
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [
                    /src/
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                },
                include: [
                    /src/
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                oneOf: [
                    {
                        use: [
                            'vue-style-loader',
                            'css-loader'
                        ]
                    }
                ]
            },
            // Semantic-UI 사용시 내장 CSS에서 url-loader가 필요함
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel',
            // }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve('src'), // 소스에서 소스루트경로 대신 사용가능
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json'], //파일 확장자 자동인식 ex) import('test') -> text.vue, test.js, test.json 자동인식
    },
    plugins: [
        // Vue 파일 로더
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
};


