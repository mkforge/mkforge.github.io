---
layout: home
hero:
  name: MKForge
  text: Swiss Army knife for development tasks
  tagline: Generate context for LLMs, analyze projects, and automate development workflows
  actions:
    - theme: brand
      text: Quick Install
      link: '#quick-install'
    - theme: alt
      text: Documentation
      link: '/guide/'

features:
  - icon: 🔄
    title: Context Generation
    details: Create comprehensive context for LLM interactions with automatic project analysis and smart content processing.
    
  - icon: 🔍
    title: Project Analysis
    details: Automatic detection of project type, dependencies, and structure with intelligent file filtering.
    
  - icon: ⚡
    title: Fast & Efficient
    details: Optimized for performance with smart caching and incremental updates for large codebases.

  - icon: 🛠️
    title: Customizable
    details: Configure ignore patterns, file size limits, and output formats to match your workflow.
    
  - icon: 🔒
    title: Privacy-First
    details: All processing happens locally. Your code never leaves your machine.
    
  - icon: 📦
    title: Easy Installation
    details: Simple installation via Homebrew or direct download, with automatic updates.
---

## Quick Install

### macOS/Linux (Recommended)
```bash
brew tap mkforge/homebrew-mkforge
brew install mkforge
```

### Manual Install

#### Linux/macOS
```bash
# One-line installer (recommended)
curl -L https://mkforge.github.io/releases/latest/mkforge-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') -o mkforge && chmod +x mkforge && sudo mv mkforge /usr/local/bin/
```

#### Windows
```powershell
# PowerShell installer (recommended)
Invoke-WebRequest -Uri "https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe" -OutFile "mkforge.exe"
```

For other installation options and direct downloads, see our [downloads page](/downloads).

## Features

- **Smart Project Analysis**: Automatically detects project type, structure, and relevant files
- **Configurable Output**: Choose between Markdown or text output with customizable formatting
- **Git Integration**: Includes Git information and respects .gitignore patterns
- **Incremental Updates**: Only regenerates context when source files change
- **Fast & Efficient**: Optimized for large codebases with smart filtering
- **Language Agnostic**: Works with any programming language or project structure

## Example Usage

```bash
# Generate context for current project
mkforge context

# Generate context for specific directory
mkforge context ./my-project

# Generate with custom output file
mkforge context -o project-context.md
```

## Support

- [GitHub Repository](https://github.com/mkforge)
- [Documentation](/guide/)

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #0047ab 30%, #4169e1);
  --vp-c-brand: #0047ab;
  --vp-c-brand-dark: #003380;
}
</style>
