<script setup>
import { useBgVideo } from '../composables/useBgVideo'

defineProps({ home: { type: Boolean, default: false } })

const { paused, toggle } = useBgVideo()
</script>

<template>
  <header class="site-header">
    <RouterLink v-if="home" to="/" class="site-header__logo">BYEOT</RouterLink>
    <RouterLink v-else to="/" class="btn-glass">← 전시 홈</RouterLink>

    <!-- 5초 넘게 자동으로 움직이는 배경 영상은 멈출 수 있어야 함 -->
    <button type="button" class="btn-glass video-toggle" :aria-pressed="String(paused)" @click="toggle">
      <span class="sr-only">{{ paused ? '배경 영상 재생' : '배경 영상 일시정지' }}</span>
    </button>
  </header>
</template>
