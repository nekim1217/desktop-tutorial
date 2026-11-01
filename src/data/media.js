// src/assets/video 의 파일을 Vite 가 빌드 경로(base 포함)로 바꿔 줍니다.
const files = import.meta.glob('../assets/video/*.{mp4,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const url = (name, ext) => files[`../assets/video/${name}.${ext}`]

export const videoSrc = (name) => url(name, 'mp4')
export const posterSrc = (name) => url(name, 'jpg')
