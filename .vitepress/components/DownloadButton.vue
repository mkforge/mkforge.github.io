<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  version?: string
  showVersion?: boolean
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

  // Detect platform and architecture
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

const getDownloadUrl = () => {
  if (!latestRelease.value) return ''
  const version = latestRelease.value.tag_name
  return `/releases/${version}/mkforge-${platform.value}-${arch.value}${platform.value === 'windows' ? '.exe' : ''}`
}

const getInstallCommand = () => {
  if (!latestRelease.value) return ''

  if (platform.value === 'darwin' || platform.value === 'linux') {
    return 'brew tap mkforge/homebrew-mkforge && brew install mkforge'
  } else if (platform.value === 'windows') {
    const version = latestRelease.value.tag_name
    return `curl -L https://mkforge.github.io/releases/${version}/mkforge-windows-amd64.exe -o mkforge.exe`
  }
  return ''
}
</script>

<template>
  <div class="download-button">
    <div v-if="latestRelease" class="download-section">
      <a :href="getDownloadUrl()" class="download-link">
        <span class="download-icon">⬇️</span>
        Download MKForge
        <span v-if="showVersion" class="version">
          {{ latestRelease.tag_name }}
        </span>
      </a>

      <div class="install-command">
        <pre><code>{{ getInstallCommand() }}</code></pre>
      </div>
    </div>
    <div v-else class="loading">
      Loading release information...
    </div>
  </div>
</template>

<style scoped>
.download-button {
  margin: 2rem 0;
}

.download-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.download-link:hover {
  background-color: var(--vp-c-brand-dark);
}

.download-icon {
  font-size: 1.2em;
}

.version {
  font-size: 0.9em;
  opacity: 0.8;
}

.install-command {
  width: 100%;
  max-width: 600px;
}

.install-command pre {
  margin: 0;
  padding: 1rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
}

.loading {
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>