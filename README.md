# MKForge Documentation Site

This repository contains the VitePress configuration and theme customization for the MKForge documentation website. It is focused on the technical setup and appearance of the documentation site.

## ⚠️ Important Note About Documentation Content

**DO NOT UPDATE THE DOCUMENTATION CONTENT IN THIS REPOSITORY**

The actual documentation content should be updated in the main [MKForge repository](https://github.com/mkforge/mkforge). This repository is only for:
- VitePress configuration
- Theme customization
- Components
- Build and deployment setup

Documentation content updates should go through the main repository's workflow to ensure proper review and synchronization.

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build the site
npm run build

# Preview the built site
npm run preview
```

## Project Structure

```
.
├── .github/          # GitHub Actions workflows
├── .vitepress/      
│   ├── components/   # Vue components
│   ├── theme/        # Theme customization
│   └── config.ts     # VitePress configuration
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Key Components

- `VersionBanner.vue`: Displays the latest version banner
- `DownloadButton.vue`: Platform-specific download button
- `ReleaseList.vue`: List of all releases
- `VersionInfo.vue`: Version information display

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

