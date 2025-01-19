<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const currentVersion = ref('')
const { isDark } = useData()

onMounted(async () => {
  try {
    const response = await fetch('/releases/releases.json')
    if (response.ok) {
      const data = await response.json()
      const latest = data.releases.find(r => r.latest)
      if (latest) {
        currentVersion.value = latest.tag_name
      }
    }
  } catch (error) {
    console.error('Failed to fetch version info:', error)
  }
})
</script>

<template>
  <div v-if="currentVersion" class="version-banner" :class="{ 'dark': isDark }">
    <div class="banner-content">
      Latest version: <strong>{{ currentVersion }}</strong>
      <a href="/downloads" class="download-link">Download now →</a>
    </div>
  </div>
</template>

<style>
/* Add this global style to adjust VitePress layout */
.VPNav {
  top: 32px !important; /* Height of our banner */
}

.VPContent {
  margin-top: 32px; /* Height of our banner */
}

/* Fix for mobile menu */
.VPNavScreen {
  top: 96px !important; /* Banner height (32px) + nav height (64px) */
  height: calc(100vh - 96px) !important;
}

@media (max-width: 640px) {
  .VPNav {
    top: 64px !important; /* Increased height for mobile */
  }

  .VPContent {
    margin-top: 64px !important; /* Increased height for mobile */
  }

  .VPNavScreen {
    top: 128px !important; /* Banner height (64px) + nav height (64px) */
    height: calc(100vh - 128px) !important;
  }
}
</style>

<style scoped>
.version-banner {
  background-color: rgb(235, 238, 255);
  text-align: center;
  padding: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--vp-c-divider);
  /* Make banner non-transparent */
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.banner-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.download-link {
  display: inline-block;
  margin-left: 1rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
}

.download-link:hover {
  text-decoration: underline;
}

.dark .version-banner {
  background-color: var(--vp-c-bg-soft);
}

@media (max-width: 640px) {
  .version-banner {
    height: 64px;
  }

  .banner-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
  }

  .download-link {
    margin-left: 0;
  }
}
</style>