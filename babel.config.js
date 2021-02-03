module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                // 按需加载
                useBuiltIns: "usage",
                corejs: {
                    version: "3.8.3",
                },
                // "targets": {
                // 内容参照.browserslistrc文件
                // }
            },
        ],
    ],
    // 按需加载
    plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-object-rest-spread"],
}
