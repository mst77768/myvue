module.exports={
    publicPath: "./", // 基本路径
    outputDir: "dist", // 输出文件目录
    assetsDir: "static",
    lintOnSave: false, //是否开启eslint保存检测
    productionSourceMap: false,
    devServer: {   // 本地服务器配置(npm run serve)
        port: 8080, // 端口
        host: "0.0.0.0", // 域名
        https: false, // 是否开启https
        open: true	// 是否在开启服务器后自动打开浏览器访问该服务器
      }
}