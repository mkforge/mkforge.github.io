import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'MKForge',
    description: 'Swiss Army knife for development tasks',

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', {
            'http-equiv': 'Content-Security-Policy',
            content: [
                "default-src 'self'",
                "style-src 'self' 'unsafe-inline'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                "img-src 'self' data: https://api.iconify.design",
                "connect-src 'self' https://api.iconify.design",
                "font-src 'self'",
                "object-src 'none'",
                "worker-src 'self' blob:"
            ].join('; ')
        }]
    ],

    cleanUrls: true,

    rewrites: {
        'releases/:version/mkforge-:platform': 'releases/:version/mkforge-:platform'
    },

    // Add proper headers for binary files
    transformHeaders: (headers: any[], path: string) => {
        if (path.startsWith('/releases/') && path.match(/mkforge-(darwin|linux|windows)/)) {
            headers.push([
                'Content-Type',
                path.endsWith('.exe') ? 'application/vnd.microsoft.portable-executable' : 'application/octet-stream'
            ])
            headers.push(['Content-Disposition', 'attachment'])
        }
        return headers
    },

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
    },

    // Configure static asset handling
    vite: {
        server: {
            fs: {
                allow: ['public']
            },
            headers: {
                // Add correct MIME types
                '.js': 'application/javascript',
                '.mjs': 'application/javascript',
                '.css': 'text/css',
                '.html': 'text/html'
            }
        },
        build: {
            assetsInlineLimit: 0,
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name.match(/mkforge-(darwin|linux|windows)/)) {
                            return `releases/[name].[ext]`
                        }
                        return 'assets/[name].[hash].[ext]'
                    }
                }
            }
        }
    },
})