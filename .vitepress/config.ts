import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ReQuizle Docs",
  description: "Documentation for ReQuizle",
  base: '/requizle-wiki/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/requizle-wiki/icon.svg' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.svg',
    nav: [
      {text: 'Guide', link: '/guide'},
      {text: 'Import/Export', link: '/import-export'},
      {text: 'Development', link: '/development'}
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          {text: 'Home', link: '/'},
          {text: 'User Guide', link: '/guide'}
        ]
      },
      {
        text: 'Advanced',
        items: [
          {text: 'Import & Export', link: '/import-export'},
          {text: 'Development', link: '/development'}
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/ReQuizle'}
    ]
  }
})
