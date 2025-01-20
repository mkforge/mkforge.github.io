---
title: Configuration
description: Customize how MKForge works with your projects
---

# Configuration Guide

MKForge can be customized to work better with your specific projects and workflow. You can set up both global defaults and project-specific settings.

## Quick Setup

### Global Settings (Recommended)
```bash
# Initialize global configuration
mkforge config init

# View current settings
mkforge config show
```

### Project Settings
```bash
# Initialize settings for current project
mkforge config init --local

# View combined settings (global + project)
mkforge config show --merged
```

## Configuration Files

### Global Configuration
Located at `$HOME/.config/mkforge/config.yaml`:

```yaml
context:
  # Project summary settings
  output_format: md     # Output format (md, txt)
  ignore_patterns:      # Files to ignore
    - ".git/"
    - "node_modules/"
    - "vendor/"
  max_file_size: 1MB    # Maximum file size to include
  max_files: 100        # Maximum files to process
```

### Project Configuration
Create `.mkforge.yaml` in your project root to override specific settings:

```yaml
# Override only the settings you want to change
context:
  ignore_patterns:
    - "build/*"
    - "*.tmp"
  max_file_size: 2MB
```

## Configuration Options

### Summary Generation Settings

| Option | Description | Default |
|--------|-------------|---------|
| output_format | Output format (md, txt) | md |
| ignore_patterns | Files to ignore | [".git/", "node_modules/", ...] |
| max_file_size | Maximum file size | 1MB |
| include_structure | Include directory structure | true |
| include_content | Include file contents | true |
| exclude_extensions | Extensions to ignore | [".exe", ".dll", ...] |
| max_files | Maximum files to include | 100 |

## Smart Ignore Patterns

MKForge automatically adds relevant ignore patterns based on your project type:

### Node.js Projects
```yaml
ignore_patterns:
  - "node_modules/"
  - "dist/"
  - "build/"
  - "coverage/"
  - ".next/"
  - ".nuxt/"
```

### Go Projects
```yaml
ignore_patterns:
  - "vendor/"
  - "bin/"
  - "dist/"
```

### Python Projects
```yaml
ignore_patterns:
  - "venv/"
  - "__pycache__/"
  - "*.pyc"
  - "build/"
  - "dist/"
  - "*.egg-info/"
```

### Java Projects
```yaml
ignore_patterns:
  - "target/"
  - "*.class"
  - "*.jar"
```

## Common Configuration Tasks

### Setting Up a New Project
```bash
# Create minimal project config
mkforge config init --local --minimal

# See what's different from global config
mkforge config diff
```

### Updating Settings
```bash
# Show current effective settings
mkforge config show --merged

# Create new config, replacing existing
mkforge config init --force
```

### Exclude File Types
```yaml
context:
  exclude_extensions:
    - ".log"
    - ".tmp"
    - ".cache"
```

### Customize File Limits
```yaml
context:
  max_file_size: 2MB
  max_files: 200
```

## Best Practices

1. **Start Global**: Set up global defaults first with `mkforge config init`
2. **Project Overrides**: Use project configs only for project-specific needs
3. **Minimal Local**: Use `--minimal` for project configs to override only what's needed
4. **Check Changes**: Use `mkforge config diff` to verify your changes
5. **Version Control**: Commit `.mkforge.yaml` to share project settings with your team

## Troubleshooting

### Common Issues

1. **Files Not Included**
    - Check file size limits
    - Verify ignore patterns
    - Use `--debug` flag for detailed info

2. **Config Not Applied**
    - Ensure correct config file location
    - Check file permissions
    - Use `config show --merged` to verify

3. **Performance Issues**
    - Adjust `max_file_size` and `max_files`
    - Add specific ignore patterns
    - Use structure-only mode for large projects

Need more help? Visit our [GitHub repository](https://github.com/mkforge/mkforge) for support.
