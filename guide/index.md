---
title: Guide
description: Getting Started with MKForge
---

# Getting Started with MKForge

MKForge is a command-line tool designed to help with development tasks, primarily focused on generating context for Large Language Models (LLMs) and automating common development workflows.

## Installation Methods

### Homebrew (Recommended for macOS/Linux)

```bash
# Install
brew tap mkforge/homebrew-mkforge
brew install mkforge

# Update
brew upgrade mkforge
```

### Direct Download

Download the appropriate binary for your platform:

```bash
# macOS (Intel)
curl -L https://mkforge.github.io/releases/latest/mkforge-darwin-amd64 -o /usr/local/bin/mkforge && chmod +x /usr/local/bin/mkforge

# macOS (Apple Silicon)
curl -L https://mkforge.github.io/releases/latest/mkforge-darwin-arm64 -o /usr/local/bin/mkforge && chmod +x /usr/local/bin/mkforge

# Linux (x86_64)
curl -L https://mkforge.github.io/releases/latest/mkforge-linux-amd64 -o /usr/local/bin/mkforge && chmod +x /usr/local/bin/mkforge

# Linux (ARM64)
curl -L https://mkforge.github.io/releases/latest/mkforge-linux-arm64 -o /usr/local/bin/mkforge && chmod +x /usr/local/bin/mkforge

# Windows (PowerShell)
Invoke-WebRequest -Uri https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe -OutFile mkforge.exe
```

### Go Install (Development Version)
```bash
go install github.com/mkforge/mkforge@latest
```

::: warning Note
When installing via `go install`, version information will show as "main" since it's built directly from source. For the full release version information, use Homebrew or direct download.
:::

## Basic Usage

### Generate Context

```bash
# Generate context for current directory
mkforge context

# Generate context for specific directory
mkforge context ./my-project

# Generate only structure
mkforge context --structure-only

# Generate with custom output file
mkforge context -o project-context.md
```

### Configuration Management

```bash
# Initialize global config
mkforge config init

# Initialize project config
mkforge config init --local

# Show current config
mkforge config show

# Show config differences
mkforge config diff
```

## Next Steps

- Learn about [Configuration](/guide/config) options and customization
- Explore the [Context Command](/guide/context) in detail
- Understand available [Plugins](/guide/plugins)