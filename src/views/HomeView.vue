<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import BgVideo from '../components/BgVideo.vue'
import { exhibitions } from '../data/exhibitions'
</script>

<template>
  <SiteHeader home />

  <main class="home">
    <BgVideo name="home" />

    <div class="home__title">
      <p class="home__eyebrow">Sunlight Exhibition 2026</p>
      <h1 class="home__heading">볕,<br />그 사이의 시간</h1>
      <p class="home__lead">
        햇빛과 햇살, 자연을 바라본 두 모임의 작은 영상 전시입니다. 서로 다른 시선으로 담은 빛을 만나보세요.
      </p>
    </div>

    <nav class="entries" aria-label="전시 선택">
      <RouterLink
        v-for="ex in exhibitions"
        :key="ex.id"
        :to="`/${ex.id}`"
        class="entry"
        :data-theme="ex.id"
      >
        <span class="entry__label">{{ ex.label }}</span>
        <strong class="entry__title">{{ ex.title }}</strong>
        <span class="entry__desc">{{ ex.desc }}</span>
        <span class="entry__more">전시 보기</span>
      </RouterLink>
    </nav>
  </main>
</template>
