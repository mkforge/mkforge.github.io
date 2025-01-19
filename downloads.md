---
title: Downloads
description: Install MKForge for your platform
---

# Installation Guide

## Recommended Methods

### Homebrew (macOS/Linux)
```bash
# Install
brew tap mkforge/homebrew-mkforge
brew install mkforge

# Update
brew upgrade mkforge
```

### One-Line Install (Linux/macOS)
```bash
# Download, make executable, and install to /usr/local/bin
curl -L https://mkforge.github.io/releases/latest/mkforge-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') -o mkforge && chmod +x mkforge && sudo mv mkforge /usr/local/bin/
```

### PowerShell Install (Windows)
```powershell
# Download and install
Invoke-WebRequest -Uri "https://mkforge.github.io/releases/latest/mkforge-windows-amd64.exe" -OutFile "mkforge.exe"

# Optional: Add to PATH
$env:Path += ";$pwd"
```

## Binary Downloads

::: warning Note
Direct binary downloads are provided for advanced users or special cases. For most users, we recommend using the installation methods above.
:::

<DownloadButton :show-version="true" />

## System Requirements

### Operating Systems
- macOS (10.15 or later)
- Linux (kernel 2.6.23 or later)
- Windows 10/11

### Architecture Support
- x86_64 (amd64)
- ARM64 (Apple Silicon, aarch64)

## Verifying Downloads

Each release includes SHA-256 checksums for verification:

### Linux/macOS
```bash
# Download checksum file
curl -O https://mkforge.github.io/releases/latest/checksums.txt

# Verify download (replace filename with your downloaded file)
sha256sum -c checksums.txt --ignore-missing
```

### Windows (PowerShell)
```powershell
# Download checksum file
Invoke-WebRequest -Uri https://mkforge.github.io/releases/latest/checksums.txt -OutFile checksums.txt

# Calculate file hash
$hash = Get-FileHash mkforge-windows-amd64.exe -Algorithm SHA256

# Compare with expected hash
Select-String -Path checksums.txt -Pattern $hash.Hash
```

## All Releases

<ReleaseList />

## Uninstallation

### Homebrew (Recommended installation)
```bash
brew uninstall mkforge
brew untap mkforge/homebrew-mkforge
```

### Manual Installation
```bash
# macOS/Linux
sudo rm /usr/local/bin/mkforge

# Windows PowerShell
Remove-Item mkforge.exe
```

### Configuration Cleanup (Optional)
```bash
# Remove global config
rm -rf $HOME/.config/mkforge

# Remove local config
rm .mkforge.yaml
```

<style scoped>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.warning {
  border-left: 4px solid var(--vp-c-warning);
  background-color: var(--vp-c-warning-soft);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}
</style>

