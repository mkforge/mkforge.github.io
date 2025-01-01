<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DownloadButton from './DownloadButton.vue'

interface Release {
  tag_name: string
  published_at: string
  latest: boolean
  assets: {
    darwin_arm64: string
    darwin_amd64: string
    linux_amd64: string
    linux_arm64: string
    windows_amd64: string
  }
}

const releases = ref<Release[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    const data = await response.json()
    releases.value = data.releases
    loading.value = false
  } catch (err) {
    console.error('Error loading releases:', err)
    loading.value = false
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="releases">
    <div v-if="loading" class="loading">
      Loading releases...
    </div>
    <div v-else class="release-list">
      <div v-for="release in releases" :key="release.tag_name" class="release-card">
        <div class="release-header">
          <h3>{{ release.tag_name }}</h3>
          <span v-if="release.latest" class="latest-badge">Latest</span>
          <span class="release-date">Released {{ formatDate(release.published_at) }}</span>
        </div>

        <DownloadButton
            :version="release.tag_name"
            :show-version="true"
            show-other-platforms
        />

        <div class="release-assets">
          <h4>SHA-256 Checksums</h4>
          <div class="checksum-grid">
            <div class="checksum-item">
              <span class="platform">macOS (Apple Silicon)</span>
              <code>{{ release.assets.darwin_arm64 }}</code>
            </div>
            <div class="checksum-item">
              <span class="platform">macOS (Intel)</span>
              <code>{{ release.assets.darwin_amd64 }}</code>
            </div>
            <div class="checksum-item">
              <span class="platform">Linux (x64)</span>
              <code>{{ release.assets.linux_amd64 }}</code>
            </div>
            <div class="checksum-item">
              <span class="platform">Linux (ARM64)</span>
              <code>{{ release.assets.linux_arm64 }}</code>
            </div>
            <div class="checksum-item">
              <span class="platform">Windows</span>
              <code>{{ release.assets.windows_amd64 }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.releases {
  margin: 2rem 0;
}

.release-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.release-card {
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.release-header {
  margin-bottom: 1.5rem;
}

.release-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.latest-badge {
  display: inline-block;
  padding: 0.2em 0.6em;
  font-size: 0.8em;
  font-weight: 500;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
}

.release-date {
  display: block;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.release-assets {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.release-assets h4 {
  margin: 0 0 1rem 0;
}

.checksum-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.checksum-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.platform {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

code {
  font-size: 0.85em;
  padding: 0.2em 0.4em;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
  word-break: break-all;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
</style>