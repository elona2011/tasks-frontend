// vue.config.js
module.exports = {
    publicPath: "/home/",
    devServer: {
        proxy: 'http://localhost:3000',
        // proxy: 'http://34.80.134.190'
    }
}