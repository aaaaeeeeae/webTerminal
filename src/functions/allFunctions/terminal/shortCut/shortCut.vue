<template>
  <a-divider style="color: white; border: white">快捷键列表</a-divider>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">快捷键名</a-col>
      <a-col :span="6">含义</a-col>
    </a-row>
  </div>
  <div v-for="(shortcut, index) in shortcutList" :key="index">
    <a-row :gutter="16">
      <a-col :span="6">{{ shortcut.desc }}</a-col>
      <a-col :span="6">{{ shortcut.keyDesc }}</a-col>
    </a-row>
  </div>
  <a-divider></a-divider>
</template>

<script setup lang="ts">
import { shortcutList } from "../../../../components/shortcut";
</script>

<style>
</style>