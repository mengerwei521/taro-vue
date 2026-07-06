export default {
  entryPagePath: "pages/launch-page/index",
  pages: [
    'pages/launch-page/index',
    'pages/home/index',
    'pages/personal/index'

  ],
  subPackages: [
    {
      root: "subPackages/mainPackageModule",
      name: "mainPackageModule",
      pages: ['pages/main-package-module-page/index'
      ],
    },
    {
      root: "subPackages/pagesModule",
      name: "pagesModule",
      pages: ['pages/demo/index',
        'pages/meng/index'
      ],
    },
    {
      root: "subPackages/componentModule",
      name: "componentModule",
      pages: ['pages/component-module-demo-page/index'
      ],
    }

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',

        text: '首页'
      },
      {
        pagePath: 'pages/personal/index',

        text: '个人中心'
      }
    ]
  },
  lazyCodeLoading: 'requiredComponents',
  usingComponents: {},
}
