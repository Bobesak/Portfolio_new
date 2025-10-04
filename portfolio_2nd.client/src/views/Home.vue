<script setup lang="ts">
import {ref} from "vue";
const selectedtab = ref<string|null>(null);
</script>

<template>
<div class="Body">
  <div class="Profile">
    <div class="Header">
      <p>
        BOBES
      </p>
    </div>
    <div class="UISelector">
    <p v-on:click = "selectedtab='info'" class="ViewSelector">Info</p>
    <p v-on:click = "selectedtab='skills'" class="ViewSelector">Skills</p>
    <p v-on:click = "selectedtab='projects'" class="ViewSelector">Projects</p>
    </div>
  </div>
  <div class="RightView">
    <div v-if="selectedtab==='info'" class="info">
      <p>this is info</p>
    </div>
    <div v-if="selectedtab==='skills'" class="skills">
      <p>this is skills</p>
    </div>
    <div v-if="selectedtab==='projects'" class="projects">
      <p>this is projects</p>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.Body{
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100vw;
  height: 90vh;
  margin: 5vh 5vw;
  border: $BorderColor 1px solid;
}
.Profile{
  display: flex;
  justify-content: flex-start;
  gap:8vh;
  height:90vh;
  width: 20vw;
  border-right: $BorderColor 1px solid;
  flex-direction: column;
  .Header{
    height: 10vh;
    width: 20vw;
    p{
      text-align: center;
      font-family: 'Bequta', monospace;
      font-size: 4vw;
      pointer-events: none;
    }
  }
}
.UISelector{
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  height:20vh;
  .ViewSelector{
    margin-left: 2vh;
    text-align: left;
    font-size:1.75vw;
    font-weight: bold;
  }
}
.RightView{
  width:30vw;
}

</style>
