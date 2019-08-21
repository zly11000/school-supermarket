module.exports = {
    configureWebpack: {
        devServer: {
            // host: "169.254.136.201",
            proxy: {
                "/api": {
                    target: "http://localhost:7002",
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            }
        },
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16, // 换算的基数
                        selectorBlackList: [], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    //css样式
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: ['./src/public/style/_minix.scss', './src/public/style/common.scss']
                })
                .end()
        })
    }
}