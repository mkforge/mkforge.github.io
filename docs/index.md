---
layout: default
title: MKForge Documentation
---

# MKForge Documentation

MKForge is a Swiss Army knife for development tasks, focusing on generating context for Large Language Models (LLMs) and automating common development workflows.

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [Development](#development)

## Installation {#installation}

### Homebrew (Recommended)
```bash
# Install
brew tap mkforge/homebrew-mkforge
brew install mkforge

# Verify installation
mkforge version
```

### Direct Download
Download the latest binary for your platform:

```bash
# macOS (Apple Silicon)
curl -L https://mkforge.github.io/releases/latest/mkforge-darwin-arm64 -o /usr/local/bin/mkforge
chmod +x /usr/local/bin/mkforge

# macOS (Intel)
curl -L https://mkforge.github.io/releases/latest/mkforge-darwin-amd64 -o /usr/local/bin/mkforge
chmod +x /usr/local/bin/mkforge
```

## Basic Usage {#basic-usage}

Generate context for LLM interactions:

```bash
# Generate context for current directory
mkforge context

# Generate context for specific directory
mkforge context ./my-project

# Generate with custom output
mkforge context -o context.md
```

## Configuration {#configuration}

MKForge supports both global and project-specific configurations.

### Global Configuration
Located at `~/.config/mkforge/config.yaml`:

```yaml
llm:
  provider: anthropic
  model: claude-3-sonnet

context:
  output_format: md
  max_file_size: 1MB
  max_files_to_include: 100
```

### Project Configuration
Create `.mkforge.yaml` in your project:

```yaml
context:
  ignore_patterns:
    - "build/*"
    - "*.tmp"
  max_file_size: 2MB
```

## Advanced Usage {#advanced-usage}

### Context Generation Options
```bash
# Structure only
mkforge context --structure-only

# Custom ignore patterns
mkforge context --ignore "*.tmp" --ignore "build/*"

# Limit file count
mkforge context --max-files 50
```

## Development {#development}

### Building from Source
```bash
# Clone repository
git clone https://github.com/mkforge/mkforge
cd mkforge

# Build
go build

# Run tests
go test ./...
```

### Contributing
We welcome contributions! Please check our [GitHub repository](https://github.com/mkforge/mkforge) for guidelines.
```

## Navigation Update (`_config.yml`):

```yaml
nav:
  - title: Documentation
    url: /docs
  - title: Downloads
    url: /downloads
  - title: GitHub
    url: https://github.com/mkforge/mkforge
```

## Downloads Page (`downloads/index.md`):

```markdown
---
layout: default
title: Download MKForge
---

# Download MKForge

## Latest Release

Latest stable version: [v0.1.1](https://mkforge.github.io/releases/v0.1.1)

### Installation Methods

#### Homebrew (Recommended)
```bash
brew tap mkforge/homebrew-mkforge
brew install mkforge
```

#### Direct Download

| Platform | Architecture | Download |
|----------|-------------|-----------|
| macOS | Apple Silicon | [mkforge-darwin-arm64](https://mkforge.github.io/releases/latest/mkforge-darwin-arm64) |
| macOS | Intel | [mkforge-darwin-amd64](https://mkforge.github.io/releases/latest/mkforge-darwin-amd64) |
| Linux | x86_64 | [mkforge-linux-amd64](https://mkforge.github.io/releases/latest/mkforge-linux-amd64) |
| Linux | ARM64 | [mkforge-linux-arm64](https://mkforge.github.io/releases/latest/mkforge-linux-arm64) |
| Windows | x86_64 | [mkforge-windows-amd64.exe](https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe) |

For checksums and verification, see the [releases page](https://mkforge.github.io/releases/latest).

## Previous Versions

For previous versions, visit our [releases archive](https://mkforge.github.io/releases).
