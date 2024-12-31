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

- **Operating Systems**
    - macOS (10.15 or later)
    - Linux (kernel 2.6.23 or later)
    - Windows 10/11
- **Architecture Support**
    - x86_64 (amd64)
    - ARM64 (Apple Silicon, aarch64)

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

.warning p {
  margin: 0;
}
</style>
