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
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    releases.value = data.releases.sort((a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
  } catch (err) {
    console.error('Error fetching releases:', err)
    error.value = 'Failed to load releases'
  } finally {
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

const formatChecksum = (checksum: string) => {
  return `${checksum.substring(0, 8)}...${checksum.substring(checksum.length - 8)}`
}
</script>

<template>
  <div class="releases">
    <div v-if="loading" class="loading">
      Loading releases...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="releases.length > 0" class="release-list">
      <div v-for="release in releases"
           :key="release.tag_name"
           class="release-card">
        <div class="release-header">
          <div class="release-title">
            <h3>
              {{ release.tag_name }}
              <span v-if="release.latest" class="latest-badge">Latest</span>
            </h3>
            <span class="release-date">Released on {{ formatDate(release.published_at) }}</span>
          </div>
        </div>

        <DownloadButton
            :version="release.tag_name"
            :show-version="false"
        />

        <div class="checksums">
          <h4>SHA-256 Checksums</h4>
          <div class="checksum-grid">
            <div class="checksum-item">
              <strong>macOS (Apple Silicon):</strong>
              <code>{{ formatChecksum(release.assets.darwin_arm64) }}</code>
            </div>
            <div class="checksum-item">
              <strong>macOS (Intel):</strong>
              <code>{{ formatChecksum(release.assets.darwin_amd64) }}</code>
            </div>
            <div class="checksum-item">
              <strong>Linux (x64):</strong>
              <code>{{ formatChecksum(release.assets.linux_amd64) }}</code>
            </div>
            <div class="checksum-item">
              <strong>Linux (ARM64):</strong>
              <code>{{ formatChecksum(release.assets.linux_arm64) }}</code>
            </div>
            <div class="checksum-item">
              <strong>Windows:</strong>
              <code>{{ formatChecksum(release.assets.windows_amd64) }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      No releases found.
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

.release-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.release-title h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
}

.latest-badge {
  display: inline-block;
  padding: 0.2em 0.6em;
  font-size: 0.7em;
  font-weight: 500;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  vertical-align: middle;
}

.release-date {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.checksums {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.checksums h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.checksum-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.checksum-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checksum-item strong {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.checksum-item code {
  font-size: 0.85em;
  padding: 0.2em 0.4em;
  background-color: var(--vp-c-bg-mute);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger);
  text-align: center;
  padding: 2rem;
}

.empty {
  color: var(--vp-c-text-2);
  text-align: center;
  padding: 2rem;
}

@media (max-width: 640px) {
  .release-card {
    padding: 1rem;
  }

  .checksum-grid {
    grid-template-columns: 1fr;
  }

  .release-title h3 {
    font-size: 1.25rem;
  }
}
</style>