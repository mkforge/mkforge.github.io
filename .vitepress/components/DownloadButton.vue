<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  version?: string
  showVersion?: boolean
  showOtherPlatforms?: boolean
}>()

const latestRelease = ref<{
  tag_name: string
  latest: boolean
  assets: {
    darwin_arm64: string
    darwin_amd64: string
    linux_amd64: string
    linux_arm64: string
    windows_amd64: string
  }
}>()

const platform = ref('')
const arch = ref('')
const showAllDownloads = ref(false)

// Improved platform detection
onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    const data = await response.json()
    latestRelease.value = data.releases.find(r => props.version ?
        r.tag_name === props.version :
        r.latest)
  } catch (error) {
    console.error('Failed to fetch release info:', error)
  }

  const ua = navigator.userAgent
  if (ua.includes('Mac')) {
    platform.value = 'darwin'
    arch.value = ua.includes('ARM') ? 'arm64' : 'amd64'
  } else if (ua.includes('Linux')) {
    platform.value = 'linux'
    arch.value = ua.includes('aarch64') ? 'arm64' : 'amd64'
  } else if (ua.includes('Win')) {
    platform.value = 'windows'
    arch.value = 'amd64'
  }
})

const platformName = computed(() => {
  const names = {
    darwin: 'macOS',
    linux: 'Linux',
    windows: 'Windows'
  }
  return names[platform.value] || 'Unknown'
})

const archName = computed(() => {
  const names = {
    arm64: 'ARM64 (Apple Silicon)',
    amd64: 'x64 (Intel/AMD)'
  }
  return names[arch.value] || ''
})

const downloadUrl = computed(() => {
  if (!latestRelease.value) return ''
  const version = latestRelease.value.tag_name
  return `/releases/${version}/mkforge-${platform.value}-${arch.value}${platform.value === 'windows' ? '.exe' : ''}`
})

const handleDownload = (e: Event) => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = downloadUrl.value
  link.download = `mkforge-${platform.value}-${arch.value}${platform.value === 'windows' ? '.exe' : ''}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const togglePlatforms = () => {
  showAllDownloads.value = !showAllDownloads.value
}
</script>

<template>
  <div class="download-section">
    <div v-if="latestRelease" class="download-container">
      <!-- Main download button -->
      <button @click="handleDownload" class="download-button">
        <span class="download-icon">⬇️</span>
        Download for {{ platformName }}
        <span class="arch">{{ archName }}</span>
        <span v-if="showVersion" class="version">{{ latestRelease.tag_name }}</span>
      </button>

      <!-- Platform selector -->
      <button @click="togglePlatforms" class="platform-toggle">
        Other platforms
        <span class="toggle-icon">{{ showAllDownloads ? '▼' : '▶' }}</span>
      </button>

      <!-- All platforms -->
      <div v-if="showAllDownloads" class="platform-list">
        <div class="platform-group">
          <h4>macOS</h4>
          <a :href="`/releases/${latestRelease.tag_name}/mkforge-darwin-arm64`" class="platform-link">
            ARM64 (Apple Silicon)
          </a>
          <a :href="`/releases/${latestRelease.tag_name}/mkforge-darwin-amd64`" class="platform-link">
            Intel (x64)
          </a>
        </div>

        <div class="platform-group">
          <h4>Linux</h4>
          <a :href="`/releases/${latestRelease.tag_name}/mkforge-linux-amd64`" class="platform-link">
            x64 (amd64)
          </a>
          <a :href="`/releases/${latestRelease.tag_name}/mkforge-linux-arm64`" class="platform-link">
            ARM64
          </a>
        </div>

        <div class="platform-group">
          <h4>Windows</h4>
          <a :href="`/releases/${latestRelease.tag_name}/mkforge-windows-amd64.exe`" class="platform-link">
            x64 (64-bit)
          </a>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      Detecting your platform...
    </div>
  </div>
</template>

<style scoped>
.download-section {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.download-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.download-button {
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.download-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.platform-toggle {
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.platform-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.platform-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.platform-group h4 {
  margin: 0;
  color: var(--vp-c-text-2);
}

.platform-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.platform-link:hover {
  background-color: var(--vp-c-bg-mute);
}

.arch {
  font-size: 0.8rem;
  opacity: 0.8;
}

.version {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-left: auto;
}

.loading {
  color: var(--vp-c-text-2);
}
</style>