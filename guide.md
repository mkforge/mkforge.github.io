---
title: Guide
description: MKForge documentation and usage guide
---

# MKForge Guide

MKForge is a command-line tool designed to help with development tasks, primarily focused on generating context for Large Language Models (LLMs) and automating common development workflows.

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

## Configuration

MKForge supports both global and project-specific configurations.

### Global Configuration

Located at `$HOME/.config/mkforge/config.yaml`:

```yaml
llm:
  provider: anthropic  # LLM provider (anthropic, openai)
  model: claude-3-sonnet  # Model to use
  api_key: ""  # Optional API key

context:
  output_format: md  # Output format (md, txt)
  ignore_patterns:  # Patterns to ignore
    - ".git/"
    - "node_modules/"
    - "vendor/"
  max_file_size: 1MB  # Maximum file size
  max_files_to_include: 100  # Maximum files to process
```

### Project Configuration

Create `.mkforge.yaml` in your project root:

```yaml
# Override only needed settings
context:
  ignore_patterns:
    - "build/*"
    - "*.tmp"
  max_file_size: 2MB
```

### Environment Variables

Environment variables take precedence over configuration files:

- `MKFORGE_LLM_PROVIDER`: Override LLM provider
- `MKFORGE_LLM_MODEL`: Override LLM model
- `MKFORGE_API_KEY`: Set API key
- `ANTHROPIC_API_KEY`: Anthropic-specific API key
- `OPENAI_API_KEY`: OpenAI-specific API key

## Generated Context Structure

The generated context includes:

1. **Project Information**
    - Project type detection
    - Git status and branch
    - Directory structure

2. **File Contents**
    - Smart file filtering
    - Binary file exclusion
    - Size-based limits

Example output:

```md
# Project Information
Type: nodejs
Git Branch: main
Git Status: clean

# File Structure
package.json
src/
  index.js
  lib/
    utils.js

# File Contents
## package.json
{
  "name": "example",
  "version": "1.0.0"
}

## src/index.js
console.log('Hello, World!');
```

## File Filtering

### Default Ignore Patterns

- Version control: `.git/`, `.svn/`
- Dependencies: `node_modules/`, `vendor/`
- Build outputs: `dist/`, `build/`
- IDE files: `.idea/`, `.vscode/`
- System files: `.DS_Store`, `Thumbs.db`

### File Size Limits

- Default maximum: 1MB per file
- Configurable via `max_file_size` setting
- Supports KB, MB, GB units

### Binary File Handling

Automatically excludes:
- Executables (`.exe`, `.dll`, `.so`)
- Archives (`.zip`, `.tar.gz`)
- Media files (`.jpg`, `.mp4`)
- Documents (`.pdf`, `.docx`)

## Project Type Detection

MKForge automatically detects project types based on common files:

- **Node.js**: `package.json`
- **Python**: `requirements.txt`, `setup.py`
- **Go**: `go.mod`
- **Ruby**: `Gemfile`
- **PHP**: `composer.json`
- **Rust**: `Cargo.toml`
- **Java**: `pom.xml`

## Best Practices

1. **Configuration**
    - Use project-specific config for custom rules
    - Override only necessary settings
    - Use `.gitignore` patterns when possible

2. **Context Generation**
    - Generate context from project root
    - Review and update ignore patterns
    - Set appropriate file size limits

3. **Version Control**
    - Commit `.mkforge.yaml` to version control
    - Ignore generated context files
    - Use `context-*.md` pattern for multiple contexts

4. **Large Projects**
    - Start with `--structure-only` for review
    - Adjust `max_files_to_include` as needed
    - Use specific ignore patterns

## Error Handling

Common issues and solutions:

1. **File Access Errors**
    - Check file permissions
    - Verify directory exists
    - Check for locked files

2. **Size Limits**
    - Increase `max_file_size` if needed
    - Use `--max-files` flag for limits
    - Check ignore patterns

3. **Configuration Issues**
    - Verify YAML syntax
    - Check environment variables
    - Use `config show` for debugging

## Support

- [GitHub Issues](https://github.com/mkforge/mkforge/issues)
- [Documentation Site](https://mkforge.github.io)
- [Release Notes](https://mkforge.github.io/downloads)

<style scoped>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>