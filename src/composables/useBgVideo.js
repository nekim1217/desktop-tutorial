import { ref } from 'vue'

// 배경 영상 일시정지 상태 (헤더 버튼과 배경 영상이 함께 사용)
const paused = ref(false)

export function useBgVideo() {
  const toggle = () => {
    paused.value = !paused.value
  }
  return { paused, toggle }
}
