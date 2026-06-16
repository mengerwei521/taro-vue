import { defineConfig } from '@tarojs/cli'
import path from 'path'
import devConfig from './dev'
import prodConfig from './prod'
import NutUIResolver from '@nutui/auto-import-resolver'
import Components from 'unplugin-vue-components/webpack'
import AutoImport from 'unplugin-auto-import/webpack'
const componentsPlugin = Components({
  resolvers: [NutUIResolver({ taro: true })],
  dts: 'types/components.d.ts', // 按需开启 TypeScript 支持
})
const autoImportPlugin = AutoImport({
  imports: ['vue', 'pinia', {
    '@tarojs/taro': [['default', 'Taro']]  // 导入 default 导出并命名为 Taro
  }],
  eslintrc: {
    enabled: true, // 生成 .eslintrc-auto-import.json //自动生成，声明通过自动导入的全局变量
    filepath: 'types/.eslintrc-auto-import.json',
  },
  dirs: ['./src'], // 需要自动导入的文件夹，默认为 src
  dts: 'types/eslintrc-auto-import.d.ts', // 自动生成的类型声明文件
})
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'new-project',
    date: '2026-5-25',
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {
    },
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'vue3',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      hot: true,  // 微信小程序热重载（Taro v3.4.0+）
      optimizeMainPackage: {
        enable: true, // 开启主包优化
      },
      // 小程序配置
      projectConfig: {
        setting: {
          urlCheck: false
        }
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.plugin('unplugin-auto-import').use(autoImportPlugin);
        chain.plugin('unplugin-vue-components').use(componentsPlugin);
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      router: {
        mode: 'browser' // 或 'hash'
      },
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(componentsPlugin)
        chain.plugin('unplugin-auto-import').use(autoImportPlugin)
      },
      devServer: {
        hot: true,           // H5 热模块替换
        host: '0.0.0.0',//指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
        proxy: {
          '/api': { // 将以 '/api' 开头的请求进行代理
            target: process.env.TARO_ENV === 'h5' ? process.env.TARO_APP_H5_BASE_URL_API : process.env.TARO_APP_MINI_BASE_URL_API, // 目标地址
            changeOrigin: true, //设置同源  默认false，是否需要改变原始主机头为目标URL,
          },
          '/micro': {
            // search为转发路径 http://devgate.shensx.com 开发
            target: process.env.TARO_APP_BASE_URL_MICRO, // 目标地址
            rewrite: (path) => path.replace(/^\/micro/, ''),
            changeOrigin: true, //设置同源  默认false，是否需要改变原始主机头为目标URL,
          },
        },
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
