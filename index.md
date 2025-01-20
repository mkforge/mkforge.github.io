---
layout: home
hero:
  name: MKForge
  text: Better AI Coding Help
  tagline: Help AI assistants understand your code projects to get more accurate, relevant answers
  actions:
    - theme: brand
      text: Quick Install
      link: '#quick-install'
    - theme: alt
      text: Documentation
      link: '/guide/'

features:
  - icon: 🤖
    title: Work Better with AI
    details: Get more accurate help from ChatGPT, Claude, and other AI assistants by letting them understand your entire project.

  - icon: 🎯
    title: One Command Setup
    details: Just run 'mkforge' in your project directory and get a complete project summary ready for AI tools.

  - icon: 🔍
    title: Smart Project Analysis
    details: Automatically detects project structure, important files, and ignores irrelevant content like build files and dependencies.

  - icon: ⚡
    title: Fast & Efficient
    details: Only processes relevant files and updates when changes occur, perfect for both small and large projects.

  - icon: 🛠️
    title: Works Everywhere
    details: Compatible with any programming language or project type - from web apps to data science projects.

  - icon: 🔒
    title: Privacy-First
    details: All analysis happens on your machine. Your code never leaves your computer.
---

## What is MKForge?

MKForge helps you get better answers from AI coding assistants like ChatGPT and Claude. Instead of copying and pasting individual files, MKForge creates a smart summary of your entire project that helps AI tools understand your code better.

### How It Works

1. Run `mkforge` in your project directory
2. Share the generated summary with your AI assistant
3. Get more accurate, context-aware help with your code

### Example Use Cases

- Get help fixing bugs by letting AI see the whole context
- Ask for code improvements with full project understanding
- Get better explanations of how your code works together
- Request new features with full project context

## Quick Install

### macOS/Linux (Recommended)
```bash
brew tap mkforge/homebrew-mkforge
brew install mkforge
```

### Direct Download

We provide pre-built binaries for all major platforms:

#### Linux/macOS
```bash
# One-line installer
curl -L https://mkforge.github.io/releases/latest/mkforge-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') -o mkforge && chmod +x mkforge && sudo mv mkforge /usr/local/bin/
```

#### Windows
```powershell
# PowerShell installer
Invoke-WebRequest -Uri "https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe" -OutFile "mkforge.exe"
```

For other installation options, see our [downloads page](/downloads).

## Basic Usage

```bash
# Go to your project directory
cd your-project

# Generate a project summary
mkforge

# The summary is saved as 'your-project.context.md' by default
# Share this file with your AI assistant!
```

## Support

- [Documentation](/guide/) - Learn all features
- [GitHub Repository](https://github.com/mkforge) - Report issues
- [Downloads](/downloads) - Get the latest version

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #0047ab 30%, #4169e1);
  --vp-c-brand: #0047ab;
  --vp-c-brand-dark: #003380;
}
</style>