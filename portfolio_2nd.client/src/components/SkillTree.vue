<template>
  <!-- This is the SVG "paper" where D3 will draw the tree -->
  <svg ref="svg"></svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as d3 from "d3";
import type { HierarchyPointLink, HierarchyPointNode } from "d3";

// helpers to translate vw/vh to px
const vw = (vw: number): number => (window.innerWidth * vw) / 100;
const vh = (vh: number): number => (window.innerHeight * vh) / 100;

// ---------------------------
// 1️⃣ Define Skill type
// ---------------------------
interface Skill {
  name: string;
  children?: Skill[];
}

export default defineComponent({
  name: "SkillTree",
  setup() {
    const svg = ref<SVGSVGElement | null>(null);

    const skills: Skill = {
      name: "Skills",
      children: [
        {
          name: "Web",
          children: [
            { name: "HTML", children: [{ name: "Intermediate" }] },
            { name: "CSS", children: [{ name: "Intermediate" }] },
            { name: "Vue.js", children: [{ name: "Beginner" }] },
            { name: "SASS", children: [{ name: "Beginner" }] },
            { name: "Typescript", children: [{ name: "Beginner" }] },
          ],
        },
        {
          name: "Other",
          children: [
            { name: "Git", children: [{ name: "Intermediate" }] },
            { name: "C#", children: [{ name: "Intermediate" }] },
          ],
        },
      ],
    };

    onMounted(() => {
      if (!svg.value) return;

      const width = vw(70);
      const height = vh(80);

      const svgSelection = d3.select(svg.value)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "background: null"); // dark background

      // ---------------------------
      // 5️⃣ hierarchy + tree layout
      // ---------------------------
      const root = d3.hierarchy<Skill>(skills);
      const treeLayout = d3.tree<Skill>()
        .size([width - 100, height - 100])
        .separation((a, b) => (a.parent === b.parent ? 1 : 3.67));

      treeLayout(root);

      // ---------------------------
      // 7️⃣ Draw links first
      // ---------------------------
      svgSelection.selectAll(".link")
        .data(root.links() as HierarchyPointLink<Skill>[])
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      // ---------------------------
      // 8️⃣ Draw nodes with gradient
      // ---------------------------
      const nodeWidth = vw(8);
      const nodeHeight = vh(8);

      const node = svgSelection.selectAll(".node")
        .data(root.descendants() as HierarchyPointNode<Skill>[])
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x - nodeWidth/2},${d.y})`);

      node.each((d: HierarchyPointNode<Skill>, i, nodes) => {
        // create defs & gradient per node
        const defs = d3.select(nodes[i] as SVGElement).append("defs");
        const grad = defs.append("linearGradient")
          .attr("id", `grad-${d.data.name.replace(/\s/g, "")}`)
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "100%");

        grad.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#FFEB7F");

        grad.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#1C1C1C");

        // append rect with gradient
        d3.select(nodes[i] as SVGElement)
          .append("rect")
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("rx", 8)
          .attr("ry", 8)
          .attr("fill", `url(#grad-${d.data.name.replace(/\s/g, "")})`)
          .attr("stroke", "black")
          .attr("stroke-width", 2);

        // append text
        d3.select(nodes[i] as SVGElement)
          .append("text")
          .text(d.data.name)
          .attr("x", nodeWidth / 2)
          .attr("y", nodeHeight / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("fill", "rgba(0,0,0,0.85)")  // almost black, blends subtly
          .attr("font-weight", "Bold")
          .style("font-size", `${vw(1)}px`)
          .style("user-select", "none")
          .style("text-shadow", "0px 1px 1px rgba(255,255,255,0.3)");
      });
    });

    return { svg };
  },
});
</script>

<style setup lang="scss" scoped>
/* optional: style links or nodes more here */
</style>
