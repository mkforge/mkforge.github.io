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
  }
}

const releases = ref<Release[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    const data = await response.json()
    releases.value = data.releases
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load releases'
    loading.value = false
    console.error('Error fetching releases:', err)
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

    <div v-else>
      <div v-for="release in releases" :key="release.tag_name" class="release">
        <div class="release-header">
          <h2>
            {{ release.tag_name }}
            <span v-if="release.latest" class="latest-badge">
              Latest
            </span>
          </h2>
          <div class="release-date">
            Released on {{ formatDate(release.published_at) }}
          </div>
        </div>

        <DownloadButton
            :version="release.tag_name"
            :show-version="true"
        />

        <div class="checksums">
          <h4>SHA-256 Checksums</h4>
          <ul>
            <li>
              <strong>macOS (Apple Silicon):</strong>
              <code>{{ formatChecksum(release.assets.darwin_arm64) }}</code>
            </li>
            <li>
              <strong>macOS (Intel):</strong>
              <code>{{ formatChecksum(release.assets.darwin_amd64) }}</code>
            </li>
            <li>
              <strong>Linux (x86_64):</strong>
              <code>{{ formatChecksum(release.assets.linux_amd64) }}</code>
            </li>
            <li>
              <strong>Linux (ARM64):</strong>
              <code>{{ formatChecksum(release.assets.linux_arm64) }}</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.releases {
  margin: 2rem 0;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger);
}

.release {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.release-header {
  margin-bottom: 1.5rem;
}

.release-header h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.latest-badge {
  font-size: 0.8em;
  padding: 0.2em 0.6em;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
}

.release-date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  margin-top: 0.5rem;
}

.checksums {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.checksums h4 {
  margin: 0 0 1rem 0;
}

.checksums ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checksums li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checksums code {
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background-color: var(--vp-c-bg);
}
</style>