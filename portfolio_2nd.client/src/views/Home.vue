<script setup lang="ts">
import {ref} from "vue";
const selectedtab = ref<string|null>("info");
const showsixseven = ref<boolean>(false);
</script>

<template>
<div class="Body">
  <div class="Profile">
    <div class="Header">
      <p class="htext" @mousedown="showsixseven=true">
        BOBES
        <span class="sixseven" :class="{visible: showsixseven}"><span style="color:blue;">6</span><span style="color:red;">7</span></span>
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
      <p>Hey! I’m a 17-year-old IT student from the Czech Republic, and I’m really into web development.</p>

      <p>Right now, I’m focused on learning HTML, CSS, and Vue.js to build cool, user-friendly websites. I’m also interested in C# and Unity because game development seems super fun and challenging.</p>

      <p>I know how to use Git, which helps me keep my projects organized and makes teamwork easier. I speak both Czech and English, so I’m comfortable working with people from different backgrounds.</p>

      <p>I’m pretty calm and easygoing, which helps me work well with almost anyone — I’m tolerant and try to understand where others are coming from.</p>

      <p>My goal is to become a full-stack developer, so I’m working hard to learn both the front-end and back-end stuff.</p>
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
.sixseven{
  left:13vw;
  top: 5.5vh;
  position: fixed;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.67s ease, top 0.67s ease;
  font-palette: white;
  z-index: -1;
  user-select: none;
}
.sixseven.visible{
  visibility: visible;
  opacity: 1;
  position: fixed;
  font-size: 4vw;
  top:12vh;
  transition: visibility 0.67s ease-out, top 0.67s ease-out;
  color: blue;
  user-select: none;
}
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
    justify-content: center;
    .htext{
      text-align: center;
      font-family: 'Bequta', monospace;
      font-size: 8vh;
      position: fixed;
      left: 9.5vw;
      top: -2.5vh;
      user-select: none;
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
  margin-right: 2vw;
  margin-top: 4vh;
  .info{
    height:80vh;
    overflow: scroll;
    padding-right: 1vw;
    scroll-behavior: smooth;
    p{
      font-size: 1.5vw;
      font-family: 'Bequta', monospace;
    }
  }
}

</style>
