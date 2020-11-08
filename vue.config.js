const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@api', resolve('src/server')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('@com', resolve('src/components'))
            .set('@views', resolve('src/views'))
    },

}
