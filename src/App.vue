<template>
  <!-- 전시 A ↔ B 이동 시 컴포넌트를 새로 만들어 갤러리 상태를 초기화 -->
  <RouterView :key="$route.fullPath" />
</template>
