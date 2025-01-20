---
title: Getting Started
description: Learn how to use MKForge with AI coding assistants
---

# Getting Started with MKForge

MKForge helps you get better answers from AI coding assistants by creating smart summaries of your projects. Instead of copying individual files, you can share a complete project overview that helps AI tools understand your code better.

## Quick Installation

### Homebrew (Recommended for macOS/Linux)
```bash
# Install
brew tap mkforge/homebrew-mkforge
brew install mkforge

# Update
brew upgrade mkforge
```

### Direct Installation
Download and install the appropriate version for your system:

```bash
# macOS/Linux
curl -L https://mkforge.github.io/releases/latest/mkforge-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') -o /usr/local/bin/mkforge && chmod +x /usr/local/bin/mkforge

# Windows (PowerShell)
Invoke-WebRequest -Uri https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe -OutFile mkforge.exe
```

## Basic Usage

### Creating Project Summaries

1. Navigate to your project:
```bash
cd your-project
```

2. Generate a summary:
```bash
mkforge context
```

3. Share the generated `context.md` with your AI assistant

### Common Options

```bash
# Generate summary for a different project
mkforge context ./other-project

# Only include project structure
mkforge context --structure-only

# Save to a specific file
mkforge context -o my-summary.md

# Use text format instead of markdown
mkforge context --format txt
```

## Working with AI Assistants

### ChatGPT Example
1. Generate your project summary
2. Copy the contents of `context.md`
3. Start a conversation with: "I have a project I'd like help with. Here's an overview:"
4. Paste your project summary
5. Ask your questions about the code

### Claude Example
1. Generate your project summary
2. Upload `context.md` to your conversation
3. Ask your questions about the code

## Tips for Better Results

1. **Start Fresh**: Begin a new conversation when sharing project context
2. **Be Specific**: After sharing context, ask clear, specific questions
3. **Update When Needed**: Regenerate the summary if you make significant changes
4. **Structure Only**: Use `--structure-only` for initial questions about project organization
5. **Custom Ignores**: Use `--ignore` to exclude irrelevant files

## Next Steps

- Learn about [Configuration](/guide/config) options and customization
- Explore the [Context Command](/guide/context) in detail