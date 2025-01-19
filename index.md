---
layout: home
hero:
  name: MKForge
  text: Swiss Army knife for development tasks
  tagline: Generate context for LLMs, analyze projects, and automate development workflows
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Download
      link: /downloads

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

## Quick Start

```bash
# Install via Homebrew (macOS/Linux)
brew tap mkforge/homebrew-mkforge
brew install mkforge

# Generate context for current project
mkforge context

# Show help
mkforge --help
```

## Features

- **Smart Project Analysis**: Automatically detects project type, structure, and relevant files
- **Configurable Output**: Choose between Markdown or text output with customizable formatting
- **Git Integration**: Includes Git information and respects .gitignore patterns
- **Incremental Updates**: Only regenerates context when source files change
- **Fast & Efficient**: Optimized for large codebases with smart filtering
- **Language Agnostic**: Works with any programming language or project structure

## License

MKForge is released under the MIT License. See the [GitHub repository](https://github.com/mkforge/mkforge) for more information.
