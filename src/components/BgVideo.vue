<script setup>
import { ref, watch, onMounted } from 'vue'
import { useBgVideo } from '../composables/useBgVideo'
import { videoSrc, posterSrc } from '../data/media'

const props = defineProps({ name: { type: String, required: true } })

const { paused } = useBgVideo()
const video = ref(null)

const sync = () => {
  if (!video.value) return
  if (paused.value) video.value.pause()
  else video.value.play().catch(() => {})
}

watch(paused, sync)
onMounted(sync)
</script>

<template>
  <div class="bg-video" :style="{ backgroundImage: `url(${posterSrc(props.name)})` }">
    <video
      ref="video"
      autoplay
      muted
      loop
      playsinline
      :poster="posterSrc(props.name)"
      aria-hidden="true"
    >
      <source :src="videoSrc(props.name)" type="video/mp4" />
    </video>
  </div>
</template>
