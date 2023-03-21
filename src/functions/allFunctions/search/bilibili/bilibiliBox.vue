<template>
  <div>
    <iframe
      :src="videoPath"
      frameborder="no"
      width="400"
      height="300"
    ></iframe>
  </div>
</template>

<script setup lang='ts'>
import { computed, toRefs } from "vue";
const props = withDefaults(defineProps<{ bvid: string }>(), {});
const { bvid } = toRefs(props);
const videoPath = computed(() => {
  return `https://player.bilibili.com/player.html?bvid=${bvid.value}`;
});
</script>

<style>
</style>