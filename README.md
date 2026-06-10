# 基于Taro+vue3+webpack的多端框架

## 解读

webpack下打包逻辑
1，默认情况：如果一个公共模块（比如 utils/format.js）被 2 个或以上分包引用，Taro 默认会把它提升到主包的公共文件里，这就会增加主包体积。
优化后：开启 optimizeMainPackage: true 后，Taro 会精确分析模块的真实依赖关系。
场景一：你的 utils 函数如果只被一个分包内部使用，它会被打入该分包的 sub-vendors.js 文件中。
场景二：如果它被多个分包使用，为避免主包膨胀，Taro 会为每个依赖该函数的分包都复制一份代码。
2，未被引用的代码（Dead Code）包在Taro生产环境打包时，默认会被自动移除；

## 插件

1， pinia 状态库
2， nutui-taro 多端UI库
3， crypto-js
4， js-md5
5， qs
6， dayjs
