import { defineConfig } from 'vitepress'
import path from 'path'
import fs from 'fs'
import { glob } from 'glob'

export default defineConfig({
    title: 'MKForge',
    description: 'Swiss Army knife for development tasks',

    // Base configuration
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

    themeConfig: {
        logo: '/logo.png',

        // Navigation based on synced structure
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Downloads', link: '/downloads' }
        ],

        // Sidebar configuration matching main repo structure
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Configuration', link: '/guide/config' },
                        { text: 'Context Commands Guide', link: '/guide/context' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/mkforge' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present MKForge'
        }
    },

    // Handle binary downloads
    rewrites: {
        'releases/:version/mkforge-:platform': 'releases/:version/mkforge-:platform'
    },

    transformHeaders: (headers, path) => {
        if (path.startsWith('/releases/') && path.match(/mkforge-(darwin|linux|windows)/)) {
            headers.push([
                'Content-Type',
                path.endsWith('.exe') ? 'application/vnd.microsoft.portable-executable' : 'application/octet-stream'
            ])
            headers.push(['Content-Disposition', 'attachment'])
        }
        return headers
    },

    // Add build configuration
    buildEnd: async (siteConfig) => {
        // Load current version from releases.json
        const releasesPath = path.join(siteConfig.outDir, 'releases/releases.json')
        if (fs.existsSync(releasesPath)) {
            const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf-8'))
            const latestVersion = releases.releases.find(r => r.latest)?.tag_name || 'latest'

            // Replace version placeholders in built files
            const files = glob.sync(path.join(siteConfig.outDir, '**/*.html'))
            files.forEach(file => {
                let content = fs.readFileSync(file, 'utf-8')
                content = content.replace(/@VERSION@/g, latestVersion)
                fs.writeFileSync(file, content)
            })
        }
    }
})