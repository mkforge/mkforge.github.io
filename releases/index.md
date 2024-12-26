---
layout: default
title: MKForge Releases
---

# MKForge Releases

## Latest Release

{% raw %}
{% assign latest_file = site.static_files | where_exp: "file", "file.path contains '/releases/latest/latest.json'" | first %}
{% if latest_file %}
{% assign latest = site.data.releases.latest %}
{% if latest %}
**Version {{ latest.tag_name }}** (Released {{ latest.published_at | date: "%Y-%m-%d" }})

    ### Downloads

    | Platform | Architecture | File | Checksum |
    |----------|-------------|------|----------|
    | macOS | Apple Silicon | [mkforge-darwin-arm64](latest/mkforge-darwin-arm64) | `{{ latest.assets.darwin_arm64 }}` |
    | macOS | Intel | [mkforge-darwin-amd64](latest/mkforge-darwin-amd64) | `{{ latest.assets.darwin_amd64 }}` |
    | Linux | x86_64 | [mkforge-linux-amd64](latest/mkforge-linux-amd64) | `{{ latest.assets.linux_amd64 }}` |
    | Linux | ARM64 | [mkforge-linux-arm64](latest/mkforge-linux-arm64) | `{{ latest.assets.linux_arm64 }}` |
    | Windows | x86_64 | [mkforge-windows-amd64.exe](latest/mkforge-windows-amd64.exe) | `{{ latest.assets.windows_amd64 }}` |
{% endif %}
{% endif %}
{% endraw %}

## All Releases

{% raw %}
{% assign version_dirs = site.static_files | where_exp: "file", "file.path contains '/releases/v'" | map: "path" | uniq %}
{% for dir in version_dirs %}
{% assign version = dir | split: "/" | last %}
- [{{ version }}]({{ dir }})
  {% endfor %}
  {% endraw %}

## Installation

See our [installation guide](/docs#installation) for detailed instructions.