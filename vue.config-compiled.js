module.exports = {
    devServer: {
        port: 9002,
        inline: true, //实时刷新
        // proxy: 'http://172.16.105.24:81/zhimakaimen/'
        proxy: {
            '/api': {
                target: 'http://172.16.105.24:81/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};

//# sourceMappingURL=vue.config-compiled.js.map