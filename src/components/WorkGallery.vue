<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { videoSrc, posterSrc } from '../data/media'

// 스와이프 자체는 CSS scroll-snap 으로 동작.
// 여기서는 이전/다음 버튼, 현재 번호, 화면 밖 영상 정지만 담당.
const props = defineProps({ works: { type: Array, required: true } })

const track = ref(null)
const cards = [] // 순서 보장을 위해 인덱스로 직접 저장
const index = ref(0)
const total = computed(() => props.works.length)

let io
onMounted(() => {
  // 가운데 들어온 카드를 현재 카드로, 벗어난 카드의 영상은 정지
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) index.value = cards.indexOf(entry.target)
        else entry.target.querySelector('video')?.pause()
      })
    },
    { root: track.value, threshold: 0.6 },
  )
  cards.forEach((card) => io.observe(card))
})
onBeforeUnmount(() => io?.disconnect())

const go = (i) => {
  const card = cards[Math.max(0, Math.min(i, total.value - 1))]
  const el = track.value
  const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
}

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <section class="gallery" id="works" aria-labelledby="works-title">
    <div class="gallery__head">
      <div>
        <h2 class="gallery__title" id="works-title">작품</h2>
        <p class="gallery__counter" aria-live="polite">
          <strong>{{ index + 1 }}</strong> / {{ total }}
        </p>
      </div>
      <div class="gallery__nav">
        <button type="button" class="btn-glass" aria-label="이전 작품" :disabled="index === 0" @click="go(index - 1)">←</button>
        <button type="button" class="btn-glass" aria-label="다음 작품" :disabled="index === total - 1" @click="go(index + 1)">→</button>
      </div>
    </div>

    <ol ref="track" class="track" tabindex="0" aria-label="작품 목록, 좌우로 넘겨보세요">
      <li v-for="(work, i) in works" :key="work.video" :ref="(el) => (cards[i] = el)" class="card">
        <div class="card__media">
          <video controls playsinline preload="metadata" :poster="posterSrc(work.video)">
            <source :src="videoSrc(work.video)" type="video/mp4" />
          </video>
        </div>
        <div class="card__body">
          <p class="card__no">WORK {{ pad(i + 1) }}</p>
          <h3 class="card__title">{{ work.title }}</h3>
          <p class="card__meta">{{ work.meta }}</p>
          <details class="docent">
            <summary>도슨트 해설</summary>
            <div class="docent__text">
              <p v-for="(line, j) in work.docent" :key="j">{{ line }}</p>
            </div>
          </details>
        </div>
      </li>
    </ol>

    <div class="progress" aria-hidden="true"></div>
  </section>
</template>
