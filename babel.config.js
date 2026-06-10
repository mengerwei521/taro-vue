// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],//targets: { node: 'current' }指定代码运行的目标环境为当前使用的 Node.js 版本 modules: false 禁用模块语法转换
    ['taro', {
      framework: 'vue3',
      ts: false,
      compiler: 'webpack5',
      'dynamic-import-node': process.env.TARO_ENV !== 'weapp',//关闭默认的 dynamic-import-node 插件，就能在代码里用 import() 来实现真正的动态加载了
    }]
  ]
}
