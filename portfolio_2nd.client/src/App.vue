npm<script setup lang="ts">
</script>

<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped lang="scss">

.container {
  background: $BackgroundColor;
  display: flex;
}:global(body) {
   margin: 0;
   min-height: 100vh;

   background-color: #1a1a1a; // base color
   font-family: 'Bequta', monospace;

 }

:global(body)::after {
  content: "";
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>");
  opacity: 0.767; // adjust grain strength
}


</style>
