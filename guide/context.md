---
title: Context Command
description: Using MKForge's context generation features
---

# Context Command Guide

The `context` command generates comprehensive context for LLM interactions.

## Basic Usage

```bash
# Generate context for current directory
mkforge context

# Generate context for specific directory
mkforge context ./my-project

# Generate with specific output file
mkforge context -o project-context.md
```

## Command Options

```bash
Options:
  -o, --output string       output file (default is ./context.md)
  -s, --structure-only     only include file structure
  -c, --content-only       only include file contents
  -f, --format string      output format (md or txt)
      --max-files int      maximum number of files to process
      --ignore strings     additional patterns to ignore
```

## Generated Context Structure

The generated context includes:

1. **Metadata Header**
   ```markdown
   <!-- MKFORGE-CONTEXT
   {
     "generated_by": "mkforge",
     "generated_at": "2025-01-19T10:38:56.482006-05:00",
     "version": "v0.1.2",
     "checksum_source": "0d1c6598..."
   }
   MKFORGE-CONTEXT -->
   ```

2. **Project Information**
   ```markdown
   # Project Information

   Type: go
   Git Branch: main
   Git Status: clean
   ```

3. **File Structure**
   ```markdown
   # File Structure

   ```
   .github/workflows/deploy.yml
   .gitignore
   cmd/root.go
   internal/config/config.go
   ```
   ```

4. **File Contents**
   ```markdown
   # File Contents

   ## cmd/root.go
   ```go
   package cmd
   ...
   ```
   ```

## Features

### Project Type Detection

MKForge automatically detects project types based on common files:

- **Node.js**: `package.json`
- **Go**: `go.mod`
- **Python**: `requirements.txt`, `setup.py`
- **Ruby**: `Gemfile`
- **PHP**: `composer.json`
- **Rust**: `Cargo.toml`
- **Java**: `pom.xml`

### Smart File Filtering

The context generator automatically:

1. Excludes binary files
2. Respects size limits
3. Follows ignore patterns
4. Skips non-text content

### Git Integration

When in a Git repository, includes:

- Current branch name
- Working directory status (clean/dirty)
- Respects `.gitignore` patterns

### Incremental Updates

MKForge maintains checksums of source files and only regenerates context when:

- Files have been modified
- Files have been added/removed
- Configuration has changed

## Best Practices

### 1. Structure Management

```bash
# Generate only structure for large projects
mkforge context --structure-only

# Generate only content for specific files
mkforge context --content-only
```

### 2. File Selection

```bash
# Limit number of files
mkforge context --max-files 50

# Add custom ignore patterns
mkforge context --ignore "tests/*" --ignore "*.tmp"
```

### 3. Output Control

```bash
# Use text format for simpler output
mkforge context -f txt

# Specify custom output location
mkforge context -o docs/project-context.md
```

### 4. Performance Tips

1. Start with `--structure-only` for large projects
2. Use appropriate `max_file_size` in config
3. Configure relevant ignore patterns
4. Use incremental updates

## Common Issues

### Large Projects

For large projects:
1. Use `--structure-only` initially
2. Adjust `max_files_to_include` in config
3. Add specific ignore patterns
4. Consider using separate contexts for different parts

### Binary Files

If binary files are being included:
1. Check excluded extensions in config
2. Add specific ignore patterns
3. Use `--max-files` to limit processing

### Memory Usage

For memory-intensive projects:
1. Reduce `max_file_size`
2. Limit number of files
3. Use more specific ignore patterns
4. Split into multiple contexts