# 볕 — 햇살 아래 두 개의 전시

햇빛·햇살·자연을 주제로 한 두 모임의 영상 전시 사이트 (정적 HTML/CSS + 최소 JS)

## 구조

```
index.html            메인: 배경 영상 + 두 전시 입구
a/index.html          전시 A 「아침의 결」 (data-theme="a")
b/index.html          전시 B 「잎 사이 볕」 (data-theme="b")
assets/css/base.css   공통 토큰 · 테마 변수 · 배경영상 · 버튼
assets/css/home.css   메인 전용
assets/css/exhibition.css  인트로 · 스와이프 카드 · 도슨트
assets/js/main.js     배경영상 일시정지, 카드 이전/다음·번호, 화면 밖 영상 정지
assets/video/         임시 영상(ffmpeg 생성 그라데이션) + 포스터 jpg
```

## 테마 바꾸기

`base.css` 의 `[data-theme="a"]`, `[data-theme="b"]` 블록에서 변수만 수정합니다.

| 변수 | 역할 |
|---|---|
| `--c-bg` | 페이지 배경색 |
| `--c-accent` | 강조색 (라벨, 번호, 진행바) |
| `--font-display` | 제목 폰트 |
| `--overlay` | 배경 영상 위 오버레이 (글자 가독성) |
| `--intro-align` / `--intro-place` | 인트로 텍스트 정렬 · 위치 |

## 작품 추가

`a/index.html` 의 `<li class="card">…</li>` 하나를 복사해 영상 경로, 제목, 도슨트 문구를 바꾸고,
`.gallery__counter` 의 전체 개수(`/ 3`)를 수정합니다.

## 브라우저별 동작

| 기능 | 미지원 시 |
|---|---|
| 스와이프 (`scroll-snap`) | 거의 모든 브라우저 지원 |
| 가운데 카드 강조, 진행바 (`animation-timeline`) | 효과 없이 정적으로 표시 |
| 도슨트 열림 애니메이션 (`::details-content`, `interpolate-size`) | 애니메이션 없이 즉시 열림 |
| 움직임 줄이기 설정 (`prefers-reduced-motion`) | 배경 영상 대신 포스터 이미지 표시 |

## 로컬 확인

```
python3 -m http.server
```
후 http://localhost:8000 접속 (파일을 직접 열어도 동작)
