/* main.js — CSS로 처리할 수 없는 최소 동작만 담당
   1) 배경 영상 일시정지 버튼 (5초 넘게 자동으로 움직이는 콘텐츠는 멈출 수 있어야 함)
   2) 작품 카드: 이전/다음 버튼, 현재 번호, 화면 밖 영상 자동 정지
   스와이프 자체는 CSS scroll-snap 으로 동작 */

(() => {
  /* ---------- 1. 배경 영상 토글 ---------- */
  const bgVideos = document.querySelectorAll('.bg-video video');
  document.querySelectorAll('.video-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const paused = btn.getAttribute('aria-pressed') === 'true';
      bgVideos.forEach((v) => (paused ? v.play() : v.pause()));
      btn.setAttribute('aria-pressed', String(!paused));
      btn.querySelector('.sr-only').textContent = paused ? '배경 영상 일시정지' : '배경 영상 재생';
    });
  });

  /* ---------- 2. 갤러리 ---------- */
  const track = document.querySelector('.track');
  if (!track) return;

  const cards = [...track.querySelectorAll('.card')];
  const current = document.querySelector('[data-current]');
  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  let index = 0;

  const update = (i) => {
    index = i;
    if (current) current.textContent = i + 1;
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === cards.length - 1;
  };

  // 가운데 들어온 카드를 현재 카드로, 벗어난 카드의 영상은 정지
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          update(cards.indexOf(entry.target));
        } else {
          entry.target.querySelector('video')?.pause();
        }
      });
    },
    { root: track, threshold: 0.6 }
  );
  cards.forEach((card) => io.observe(card));

  const go = (i) => {
    const card = cards[Math.max(0, Math.min(i, cards.length - 1))];
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));

  update(0);
})();
