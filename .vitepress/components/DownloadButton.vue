<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Release {
  tag_name: string
  latest: boolean
  assets: {
    darwin_arm64: string
    darwin_amd64: string
    linux_amd64: string
    linux_arm64: string
    windows_amd64: string
  }
}

const props = defineProps<{
  version?: string
  showVersion?: boolean
}>()

const latestRelease = ref<Release | null>(null)
const platform = ref('')
const arch = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    latestRelease.value = data.releases.find((r: Release) =>
        props.version ? r.tag_name === props.version : r.latest
    ) || null

    // Platform detection
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
  } catch (err) {
    console.error('Error fetching release info:', err)
    error.value = 'Failed to load release information'
  } finally {
    loading.value = false
  }
})

const platformName = computed(() => {
  const names: Record<string, string> = {
    darwin: 'macOS',
    linux: 'Linux',
    windows: 'Windows'
  }
  return names[platform.value] || 'Unknown'
})

const archName = computed(() => {
  const names: Record<string, string> = {
    arm64: 'ARM64',
    amd64: 'x64'
  }
  return names[arch.value] || ''
})

const downloadUrl = computed(() => {
  if (!latestRelease.value) return ''
  const version = latestRelease.value.tag_name
  return `/releases/${version}/mkforge-${platform.value}-${arch.value}${platform.value === 'windows' ? '.exe' : ''}`
})

const downloadFor = (selectedPlatform: string, selectedArch: string) => {
  platform.value = selectedPlatform
  arch.value = selectedArch
  handleDownload(new Event('click'))
}

const handleDownload = (e: Event) => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = downloadUrl.value
  link.download = `mkforge-${platform.value}-${arch.value}${platform.value === 'windows' ? '.exe' : ''}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="download-section">
    <div v-if="loading" class="loading">
      Detecting your platform...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="latestRelease" class="download-container">
      <div class="primary-download">
        <button @click="handleDownload" class="download-button">
          <span class="download-icon">⬇️</span>
          Download for {{ platformName }}
          <span class="arch">{{ archName }}</span>
          <span v-if="showVersion" class="version">{{ latestRelease.tag_name }}</span>
        </button>
      </div>

      <div class="platform-options">
        <div class="platform-label">Other platforms:</div>
        <div class="platform-grid">
          <div class="platform-group">
            <a @click.prevent="downloadFor('darwin', 'arm64')"
               class="platform-option"
               :class="{ active: platform === 'darwin' && arch === 'arm64' }">
              macOS (Apple Silicon)
            </a>
            <a @click.prevent="downloadFor('darwin', 'amd64')"
               class="platform-option"
               :class="{ active: platform === 'darwin' && arch === 'amd64' }">
              macOS (Intel)
            </a>
            <a @click.prevent="downloadFor('linux', 'amd64')"
               class="platform-option"
               :class="{ active: platform === 'linux' && arch === 'amd64' }">
              Linux (x64)
            </a>
            <a @click.prevent="downloadFor('linux', 'arm64')"
               class="platform-option"
               :class="{ active: platform === 'linux' && arch === 'arm64' }">
              Linux (ARM64)
            </a>
            <a @click.prevent="downloadFor('windows', 'amd64')"
               class="platform-option"
               :class="{ active: platform === 'windows' }">
              Windows (64-bit)
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="error">
      Release not found.
    </div>
  </div>
</template>

<style scoped>
.download-section {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.download-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.primary-download {
  width: 100%;
}

.download-button {
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.download-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.platform-options {
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.platform-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.platform-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.platform-option {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--vp-c-bg-mute);
}

.platform-option:hover {
  background-color: var(--vp-c-brand-soft);
}

.platform-option.active {
  background-color: var(--vp-c-brand);
  color: white;
}

.arch {
  font-size: 0.9rem;
  opacity: 0.9;
}

.version {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-left: auto;
}

.loading {
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .platform-grid {
    flex-direction: column;
  }

  .platform-option {
    text-align: center;
  }
}
</style>