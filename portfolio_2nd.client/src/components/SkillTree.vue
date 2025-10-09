<template>
  <!-- This is the SVG "paper" where D3 will draw the tree -->
  <svg ref="svg"></svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"; // Vue helpers
import * as d3 from "d3"; // Import D3 for drawing

// ---------------------------
// 1️⃣ Define the Skill type
// ---------------------------
// TypeScript needs to know what a skill is
// Each skill has a name, and optionally an array of children
interface Skill {
  name: string;
  children?: Skill[];
}

export default defineComponent({
  name: "SkillTree",
  setup() {
    // ---------------------------
    // 2️⃣ Create a Vue ref for SVG
    // ---------------------------
    // Vue ref is a way to access DOM elements
    const svg = ref<SVGSVGElement | null>(null);

    // ---------------------------
    // 3️⃣ Hardcode the skill tree data
    // ---------------------------
    const skills: Skill = {
      name: "Skills", // Root node
      children: [
        {
          name: "Web", // First category
          children: [
            { name: "HTML" },
            { name: "CSS" },
            { name: "Vue.js" },
            { name: "SASS" },
            { name: "Typescript (noob)" },
          ],
        },
        {
          name: "Other", // Second category
          children: [
            { name: "Git" },
            { name: "C#" },
          ],
        },
      ],
    };

    // ---------------------------
    // 4️⃣ Run D3 code when component mounts
    // ---------------------------
    onMounted(() => {
      if (!svg.value) return; // Make sure SVG exists

      const width = 600;  // width of SVG canvas
      const height = 400; // height of SVG canvas

      // Select the SVG element and set its size and background
      const svgSelection = d3.select(svg.value)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "background: null"); // dark background

      // ---------------------------
      // 5️⃣ Convert data into hierarchy
      // ---------------------------
      // D3 needs hierarchy objects to understand parent-child structure
      const root = d3.hierarchy<Skill>(skills);

      // ---------------------------
      // 6️⃣ Generate tree layout
      // ---------------------------
      // Calculates x, y positions for each node
      const treeLayout = d3.tree<Skill>().size([width - 100, height - 100]);
      treeLayout(root); // modifies `root` with x and y positions

      // ---------------------------
      // 7️⃣ Draw lines between nodes (links)
      // ---------------------------
      svgSelection.selectAll(".link")         // select all lines (none yet)
        .data(root.links())                   // bind parent-child data
        .enter()                              // for each data element that doesn't exist yet
        .append("line")                       // create <line> element
        .attr("class", "link")                // CSS class
        .attr("x1", d => d.source.x)          // parent x
        .attr("y1", d => d.source.y)          // parent y
        .attr("x2", d => d.target.x)          // child x
        .attr("y2", d => d.target.y)          // child y
        .attr("stroke", "#0ff")               // line color
        .attr("stroke-width", 2);             // line thickness

      // ---------------------------
      // 8️⃣ Draw nodes as boxes
      // ---------------------------
      const nodeWidth = 100;  // width of each box
      const nodeHeight = 40;  // height of each box

      const node = svgSelection.selectAll(".node")
        .data(root.descendants())             // bind all nodes
        .enter()
        .append("g")                          // create a <g> group for each node
        .attr("class", "node")                // CSS class
        .attr("transform", d => `translate(${d.x - nodeWidth/2},${d.y})`);
      // subtract nodeWidth/2 to center box over x coordinate

      // Rectangle for the node
      node.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 8)              // rounded corners
        .attr("ry", 8)
        .attr("fill", null)       // dark gray inside
        .attr("stroke", "black")     // cyan border
        .attr("stroke-width", 2);

      // Text label inside the box
      node.append("text")
        .text(d => d.data.name)     // show the skill name
        .attr("x", nodeWidth / 2)   // center horizontally
        .attr("y", nodeHeight / 2)  // roughly center vertically
        .attr("dy", "0.35em")       // fine-tune vertical alignment
        .attr("text-anchor", "middle") // center text
        .attr("fill", "#fff")       // white text
        .style("font-size", "12px"); // font size
    });

    return { svg }; // return ref so Vue can track it
  },
});
</script>

<style setup lang="scss"scoped>
/* optional: you can style links or nodes more here */
</style>
