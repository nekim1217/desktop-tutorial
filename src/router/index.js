import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExhibitionView from '../views/ExhibitionView.vue'
import { exhibitions } from '../data/exhibitions'

const SITE = '볕'

// GitHub Pages 는 새로고침 시 하위 경로를 찾지 못하므로 해시(#/a) 방식을 사용
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: `${SITE} — 햇살 아래 두 개의 전시` },
    },
    {
      path: '/:id(a|b)',
      name: 'exhibition',
      component: ExhibitionView,
      props: true,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
})

// 전시별 테마(data-theme)와 페이지 제목
router.afterEach((to) => {
  const ex = exhibitions[to.params.id]
  const root = document.documentElement
  if (ex) {
    root.dataset.theme = ex.id
    document.title = `${ex.title} — 전시 ${ex.id.toUpperCase()} | ${SITE}`
  } else {
    delete root.dataset.theme
    document.title = to.meta.title
  }
})

export default router
