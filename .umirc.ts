export default {
  title: 'Wowjoy',
  // history: { type: 'hash' },
  mode: 'site',
  favicon: 'https://avatars3.githubusercontent.com/u/40052020?s=200&v=4',
  logo: 'https://avatars3.githubusercontent.com/u/40052020?s=200&v=4',
  outputPath: 'docs-dist',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  menus: {
    '/core/layout': [
      {
        title: '布局双方都',
      },
    ],
  },
  navs: {
    'en-US': [
      {
        title: 'Guide',
        path: '/guide',
      },
      {
        title: 'Core',
        path: '/core',
      },
      {
        title: 'UI',
        path: '/ui',
      },
      {
        title: 'Hooks',
        path: '/hooks',
      },
      {
        title: 'Icons',
        path: '/icons',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/wow-joy/wowjoy',
      },
    ],
    'zh-CN': [
      {
        title: '指南',
        path: '/guide',
      },
      {
        title: '基础组件',
        path: '/core',
      },
      {
        title: 'UI组件',
        path: '/ui',
      },
      {
        title: 'Hooks',
        path: '/hooks',
      },
      {
        title: '图标',
        path: '/icons',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/wow-joy/wowjoy',
      },
    ],
  },
  theme: {
    '@c-primary': '#198EEB',
    '@c-heading': '#000',
    '@c-text': '#333',
    '@c-secondary': ' #666',
    '@c-link': '@c-primary',
    '@c-border': '#ebedf1',
  },
};
