<script setup lang="ts">
import { ref } from "vue";
import SkillTree from "@/components/SkillTree.vue";

const selectedtab = ref<string | null>("info");
const showsixseven = ref<boolean>(false);
</script>

<template>
  <div class="Body">
    <div class="Profile">
      <div class="Header">
        <p class="htext" @mousedown="showsixseven = true">
          BOBES
          <span class="sixseven" :class="{ visible: showsixseven }">
            <span style="color:red;">6</span><span style="color:blue;">7</span>
          </span>
        </p>
      </div>
      <div class="UISelector">
        <p @click="selectedtab = 'info'" class="ViewSelector">Info</p>
        <p @click="selectedtab = 'skills'" class="ViewSelector">Skills</p>
        <p @click="selectedtab = 'projects'" class="ViewSelector">Projects</p>
      </div>
    </div>
    <div class="RightView">
      <div v-if="selectedtab === 'info'" class="info">
        <p>Hey! I’m a 17-year-old IT student from the Czech Republic, and I’m really into web development.</p>
        <p>Right now, I’m focused on learning HTML, CSS, and Vue.js to build cool, user-friendly websites. I’m also interested in C# and Unity because game development seems super fun and challenging.</p>
        <p>I know how to use Git, which helps me keep my projects organized and makes teamwork easier. I speak both Czech and English, so I’m comfortable working with people from different backgrounds.</p>
        <p>I’m pretty calm and easygoing, which helps me work well with almost anyone — I’m tolerant and try to understand where others are coming from.</p>
        <p>My goal is to become a full-stack developer, so I’m working hard to learn both the front-end and back-end stuff.</p>
      </div>
      <div v-if="selectedtab === 'skills'" class="skills">
          <div class="SkillsTree">
            <SkillTree/>
          </div>
      </div>
      <div v-if="selectedtab === 'projects'" class="projects">
        <p>this is projects</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">



.Body {
  display: flex;
  justify-content: flex-start;
  align-self: center;
  width: 100vw;
  height: 90vh;
  margin: 5vh 5vw;
  border: 1px solid $BorderColor; /* example border color */
}

.Profile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8vh;
  height: 90vh;
  width: 20vw;
  border-right: 1px solid $BorderColor;

  .Header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    width: 100%;
    position: relative; // anchor the stuff

    .htext {
      position: relative;
      font-family: monospace;
      font-size: 8vh;
      margin: 0;
      user-select: none;
      z-index: 1; // sit on top

      .sixseven {
        position: fixed;
        left: 13vw;
        top: 5.5vh;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.67s ease, top 0.67s ease;
        z-index: 0; // sits *under* .htext but above bg
        user-select: none;
      }

      .sixseven.visible {
        visibility: visible;
        opacity: 1;
        top: 12vh;
        font-size: 4vw;
        color: blue;
      }
    }
  }
}

  .UISelector {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20vh;

  .ViewSelector {
    margin-left: 2vh;
    text-align: left;
    font-size: 1.75vw;
    font-weight: bold;
    cursor: pointer;
  }
}

.RightView {
  width: 60vw;
  margin-left:3vw;
  margin-top: 4vh;

  .info {
    width: 30vw;
    height: 80vh;
    padding-right: 1vw;
    scroll-behavior: smooth;
    //scroll bar
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    //webkit css
    .info::-webkit-scrollbar{
      display: none;
    }

    p {
      font-size: 1.5vw;
      font-family: monospace;
    }
  }
  .SkillsTree{
  }

}
</style>
