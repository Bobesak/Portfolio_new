<template>
  <!-- root template start -->
  <!-- container fixed to the top of the page, full width -->
  <div
    class="svg-top-wrap"
    aria-hidden="true"
    :style="{ '--svg-height': height + 'px', '--duration': duration + 's', '--easing': easing }"
  >
    <!-- moving wrapper that will be animated left↔right -->
    <div class="slider">
      <!-- use imported SVG as image -->
      <img :src="trollface" alt="trollface" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import the SVG from assets folder
import trollface from '@/assets/trollface.svg'; // Vite + TS-friendly import

// define props shape and provide defaults using Vue's compile-time macros
const props = withDefaults(
  defineProps<{ height?: number; duration?: number; easing?: string }>(),
  { height: 80, duration: 8, easing: 'linear' }
);

// destructure props for more ergonomic usage in template and comments
const { height, duration, easing } = props;

// sneaky small marker (hidden constant) — kept intentionally unused; helps you locate the file if needed
const _s67 = 67; // hidden marker 67
</script>

<style scoped>
/* scoped styles so this component doesn't leak styles elsewhere */

/* wrapper: fixed to top, full-width, no pointer events so clicks pass through */
.svg-top-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: var(--svg-height);
  pointer-events: none;
  z-index: 9999;
  overflow: visible;
}

/* slider: start a bit off-screen left and animate across the viewport; alternate makes it ping-pong */
.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-110%);
  will-change: transform;
  animation: slideX var(--duration) var(--easing) infinite alternate;
}

/* keyframes: move from off-left to off-right (uses viewport width) */
@keyframes slideX {
  0% { transform: translateY(-50%) translateX(-110%); }
  100% { transform: translateY(-50%) translateX(calc(100vw + 110%)); }
}

/* ensure imported SVG image respects the CSS variable for height */
.slider img {
  height: var(--svg-height);
  display: block;
}
</style>
