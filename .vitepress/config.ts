import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'MKForge',
    description: 'Swiss Army knife for development tasks',

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', {
            'http-equiv': 'Content-Security-Policy',
            content: "default-src 'self'; connect-src 'self'; download-src 'self'"
        }]
    ],

    themeConfig: {
        logo: '/logo.png',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Downloads', link: '/downloads' },
            { text: 'Guide', link: '/guide' }
        ],

        sidebar: false,

        socialLinks: [
            { icon: 'github', link: 'https://github.com/mkforge/mkforge' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present MKForge'
        }
    }
})