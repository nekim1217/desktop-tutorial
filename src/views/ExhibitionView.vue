<script setup>
import { computed } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import BgVideo from '../components/BgVideo.vue'
import WorkGallery from '../components/WorkGallery.vue'
import { exhibitions } from '../data/exhibitions'

const props = defineProps({ id: { type: String, required: true } })

const ex = computed(() => exhibitions[props.id])
const other = computed(() => exhibitions[ex.value.other])

// 해시 라우터와 충돌하지 않도록 #works 는 직접 스크롤
const scrollToWorks = () => {
  document.getElementById('works')?.scrollIntoView()
}
</script>

<template>
  <SiteHeader />

  <main>
    <section class="intro" aria-labelledby="intro-title">
      <BgVideo :name="ex.introVideo" />

      <div class="intro__inner">
        <p class="intro__eyebrow">{{ ex.label }}</p>
        <h1 class="intro__title" id="intro-title">{{ ex.title }}</h1>
        <p class="intro__lead">{{ ex.lead }}</p>
        <dl class="intro__meta">
          <div><dt>기간</dt><dd>{{ ex.period }}</dd></div>
          <div><dt>참여</dt><dd>{{ ex.members }}</dd></div>
        </dl>
        <a href="#works" class="btn-glass intro__cue" @click.prevent="scrollToWorks">작품 보기 </a>
      </div>
    </section>

    <WorkGallery :works="ex.works" />
  </main>

  <footer class="site-footer">
    <RouterLink to="/">← 전시 홈</RouterLink>
    <RouterLink :to="`/${other.id}`">{{ ex.otherLabel }}: {{ other.title }} →</RouterLink>
  </footer>
</template>
