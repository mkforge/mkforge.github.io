---
title: Downloads
description: Download MKForge for your platform
---

# Download MKForge

<DownloadButton :show-version="true" />

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

Download the appropriate binary for your platform from the releases below.

#### Linux/macOS
```bash
# Download (replace arch with amd64 or arm64)
curl -L https://mkforge.github.io/releases/latest/mkforge-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/') -o mkforge

# Make executable
chmod +x mkforge

# Optional: Move to system path
sudo mv mkforge /usr/local/bin/
```

#### Windows
Download the Windows executable from the latest release and add it to your system PATH.

### Go Install (Development Version)
```bash
go install github.com/mkforge/mkforge@latest
```

::: warning Note
When installing via `go install`, version information will show as "main" since it's built directly from source. For the full release version information, use Homebrew or direct download.
:::

## Releases

<ReleaseList />

## Verifying Downloads

Each release includes SHA-256 checksums for verification. To verify your download:

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

## System Requirements

### Operating Systems
- macOS (10.15 or later)
- Linux (kernel 2.6.23 or later)
- Windows 10/11

### Architecture Support
- x86_64 (amd64)
- ARM64 (Apple Silicon, aarch64)

## Uninstallation

### Homebrew
```bash
brew uninstall mkforge
brew untap mkforge/homebrew-mkforge
```

### Direct Download
```bash
# macOS/Linux
rm /usr/local/bin/mkforge

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
.download-section {
  margin: 3rem 0;
  text-align: center;
}

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #0047ab 30%, #4169e1);
  --vp-c-brand: #0047ab;
  --vp-c-brand-dark: #003380;
}
</style>