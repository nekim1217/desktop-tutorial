# 볕 — 햇살 아래 두 개의 전시

햇빛·햇살·자연을 주제로 한 두 모임의 영상 전시 사이트 (Vue 3 + Vite, GitHub Pages 배포)

## 실행

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # dist/ 생성 (main 푸시 시 GitHub Actions 가 자동 배포)
```

## 구조

```
index.html                   폰트 로드 + 앱 진입점
src/main.js                  스타일 · 라우터 연결
src/router/index.js          #/ 홈, #/a 전시 A, #/b 전시 B (테마·제목 설정)
src/data/exhibitions.js      전시 · 작품 · 도슨트 문구 (콘텐츠는 여기만 수정)
src/data/media.js            영상 / 포스터 파일 경로 처리
src/views/HomeView.vue       메인: 배경 영상 + 두 전시 입구
src/views/ExhibitionView.vue 전시 상세: 인트로 + 작품 + 푸터
src/components/              SiteHeader · BgVideo · WorkGallery
src/composables/useBgVideo.js 배경 영상 일시정지 상태
src/styles/base.css          공통 토큰 · 테마 변수 · 배경영상 · 버튼
src/styles/home.css          메인 전용
src/styles/exhibition.css    인트로 · 스와이프 카드 · 도슨트
src/assets/video/            임시 영상 + 포스터 jpg
```

## 테마 바꾸기

`src/styles/base.css` 의 `[data-theme="a"]`, `[data-theme="b"]` 블록에서 변수만 수정합니다.

| 변수 | 역할 |
|---|---|
| `--c-bg` | 페이지 배경색 |
| `--c-accent` | 강조색 (라벨, 번호, 진행바) |
| `--font-display` | 제목 폰트 |
| `--overlay` | 배경 영상 위 오버레이 (글자 가독성) |
| `--intro-align` / `--intro-place` | 인트로 텍스트 정렬 · 위치 |

## 작품 추가

1. `src/assets/video/` 에 `이름.mp4` 와 포스터 `이름.jpg` 를 넣습니다.
2. `src/data/exhibitions.js` 의 `works` 배열에 항목을 추가합니다. 번호와 전체 개수는 자동으로 바뀝니다.

## 브라우저별 동작

| 기능 | 미지원 시 |
|---|---|
| 스와이프 (`scroll-snap`) | 거의 모든 브라우저 지원 |
| 가운데 카드 강조, 진행바 (`animation-timeline`) | 효과 없이 정적으로 표시 |
| 도슨트 열림 애니메이션 (`::details-content`, `interpolate-size`) | 애니메이션 없이 즉시 열림 |
| 움직임 줄이기 설정 (`prefers-reduced-motion`) | 배경 영상 대신 포스터 이미지 표시 |
