import { viteBundler } from '@vuepress/bundler-vite'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Mapbox GL JS Cookbook',
  description: 'Mapbox GL JS Cookbook',
  base: '/mapbox-gl-js-cookbook/',
  head: [
    ['link', { rel: 'icon', href: '/mapbox-gl-js-cookbook/assets/logo.png' }],
    ['meta', { name: 'algolia-site-verification', content: '4A24609825FB7212' }],
  ],
  alias: {
    '@': path.resolve(__dirname, './'),
  },
  plugins: [
    searchPlugin({
      // 配置项
    }),
    registerComponentsPlugin({
      // 配置项
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  theme: defaultTheme({
    logo: '/assets/logo.png',
    navbar: [
      { text: '快速开始', link: '/starter/' },
      { text: '样式规范', link: '/style-spec/' },
      { text: '空间数据', link: '/data/' },
      { text: '插件', link: '/plugins/' },
      { text: '进阶', link: '/advance/' },
      { text: 'DECK.GL', link: '/deck-gl/' },
      {
        text: 'Mapbox',
        children: [
          { text: '文档', link: 'https://docs.mapbox.com/mapbox-gl-js/api/' },
          { text: '术语', link: 'https://docs.mapbox.com/help/glossary/' },
          { text: '示例', link: 'https://docs.mapbox.com/mapbox-gl-js/example/' },
        ],
      },
    ],
    sidebarDepth: 2,
    // sidebar: 'auto',
    sidebar: {
      '/starter/': [
        {
          text: '快速开始',
          link: '/starter/',
        },
        {
          text: '标准样式',
          link: '/starter/standard-style/',
        },
        {
          text: '交互处理',
          children: ['/starter/handlers/popup', '/starter/handlers/control', '/starter/handlers/marker'],
        },
        {
          text: '教程',
          children: ['/starter/tutorials/highlight'],
        },
        {
          text: '地理与几何',
          link: '/starter/geography/',
        },
        {
          text: '地图服务',
          children: ['/starter/service/', '/starter/service/geoserver', '/starter/service/ogcapi'],
        },
      ],
      '/style-spec/': [
        {
          text: '样式规范',
          children: [
            '/style-spec/',
            '/style-spec/sprite',
            '/style-spec/glyphs',
            {
              text: '数据源',
              children: [
                '/style-spec/sources/',
                '/style-spec/sources/tile',
                '/style-spec/sources/geojson',
                '/style-spec/sources/image-video',
                '/style-spec/sources/custom',
              ],
            },
            '/style-spec/layers',
            '/style-spec/expression',
            '/style-spec/light',
            '/style-spec/terrain',
          ],
        },
      ],
      '/data/': [
        {
          text: '空间数据',
          children: [
            '/data/',
            {
              text: '点',
              children: [
                '/data/point/',
                '/data/point/circle',
                '/data/point/cluster',
                '/data/point/symbol',
                '/data/point/heatmap',
                '/data/point/marker',
              ],
            },
            '/data/line',
            '/data/polygon',
            '/data/raster',
            '/data/thematic',
          ],
        },
      ],
      '/plugins/': [
        // {
        //   text: 'Plugins and frameworks',
        //   link: 'https://docs.mapbox.com/mapbox-gl-js/plugins/',
        // },
        {
          text: '插件',
          children: [
            '/plugins/draw',
            '/plugins/image-layer',
            '/plugins/grid-layer',
            '/plugins/echarts-layer',
            '/plugins/polygon-morpher',
          ],
        },
      ],
      '/advance/': [
        {
          text: '进阶',
          children: [
            '/advance/',
            '/advance/custom-source',
            '/advance/custom-layer',
            '/advance/track',
            '/advance/ECharts',
            '/advance/met',
          ],
        },
      ],
      '/deck-gl/': [
        {
          text: 'DECK.GL',
          children: [
            '/deck-gl/',
            '/deck-gl/ArcLayer',
            '/deck-gl/GridLayer',
            '/deck-gl/HexagonLayer',
            '/deck-gl/PathLayer',
          ],
        },
      ],
    },
    repo: 'huanglii/mapbox-gl-js-cookbook',
    docsDir: 'docs',
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页！',
    lastUpdated: true,
    lastUpdatedText: '上次更新',
    contributors: true,
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: ['404 未找到', '找不着了'],
    backToHome: '返回首页',
    openInNewWindow: '在新页面打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  }),

  bundler: viteBundler({
    viteOptions: {
      envDir: path.resolve(__dirname, '../../'),
    },
  }),
})
