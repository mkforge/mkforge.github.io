<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentVersion = ref('')

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
  <span v-if="currentVersion">{{ currentVersion }}</span>
  <span v-else>latest</span>
</template>