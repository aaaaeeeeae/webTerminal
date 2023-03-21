<template>
  <a-divider style="color: white; border: white">命令列表</a-divider>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">命令</a-col>
      <a-col :span="6">含义</a-col>
      <a-col :span="6">描述</a-col>
    </a-row>
  </div>
  <div v-for="(func, index) in functionList" :key="index">
    <a-row :gutter="16">
      <a-col :span="6">{{ func.functionName }}</a-col>
      <a-col :span="6">{{ func.functionNameC }}</a-col>
      <a-col :span="6">{{ func.desc }}</a-col>
    </a-row>
  </div>
  <a-divider
    orientation="right"
    style="color: white;"
  >
    tips：可通过输入'help 命令名'来获取某个命令具体使用方法 eg：help baidu
  </a-divider>
  <a-divider></a-divider>
</template>

<script setup lang="ts">
import { functionList } from "../../../functionRegister";
</script>

<style>
</style>