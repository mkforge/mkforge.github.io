---
layout: default
title: MKForge Releases
---

# MKForge Releases

## Latest Release

Version v0.1.0

### Downloads

| Platform | Architecture | File | Checksum |
|----------|-------------|------|----------|
| macOS | Apple Silicon | [mkforge-darwin-arm64](/releases/latest/mkforge-darwin-arm64) | [View](/releases/latest/checksums.txt) |
| macOS | Intel | [mkforge-darwin-amd64](/releases/latest/mkforge-darwin-amd64) | [View](/releases/latest/checksums.txt) |
| Linux | x86_64 | [mkforge-linux-amd64](/releases/latest/mkforge-linux-amd64) | [View](/releases/latest/checksums.txt) |
| Linux | ARM64 | [mkforge-linux-arm64](/releases/latest/mkforge-linux-arm64) | [View](/releases/latest/checksums.txt) |
| Windows | x86_64 | [mkforge-windows-amd64.exe](/releases/latest/mkforge-windows-amd64.exe) | [View](/releases/latest/checksums.txt) |

## All Releases

{% assign releases = site.static_files | where_exp: "file", "file.path contains '/releases/v'" | map: "path" | split: "/" | uniq %}
{% for release in releases %}
{% unless release contains "latest" %}
### {{ release }}

| File | Checksum |
|------|----------|
    {% assign files = site.static_files | where_exp: "file", "file.path contains release" %}
    {% for file in files %}
      {% unless file.path contains 'checksums.txt' or file.path contains 'latest.json' %}
| [{{ file.name }}](/releases/{{ release }}/{{ file.name }}) | [View](/releases/{{ release }}/checksums.txt) |
{% endunless %}
{% endfor %}
{% endunless %}
{% endfor %}

## Installation

See our [installation guide](/docs#installation) for detailed instructions.