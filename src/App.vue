<template>
  <Terminal ref="tml"></Terminal>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { preanalysis } from "./functions/core";
const tml = ref();
async function submitCore(text: string) {
  console.log(tml.value.terminal);
  await preanalysis(text, tml.value.terminal);
}
provide("submitToCore", submitCore);
</script>

<style type="text/css">
</style>

