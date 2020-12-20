const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@api', resolve('src/server')) 
            .set('@com', resolve('src/components'))
            .set('@tools', resolve('src/tools'))
            .set('@views', resolve('src/views'))
    },

}
