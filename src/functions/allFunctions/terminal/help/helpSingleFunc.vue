<template>
  <div style="height:10px"></div>
  <div>
    <div>命令名：{{ func.functionName }}</div>
    <div>介绍：{{ func.functionNameC }}</div>
    <div v-if="func.alias">命令简写形式：{{ func.alias.join(" | ") }}</div>
    <div>用法：{{ helpStr }}</div>
    <template
      v-if="func.subFunctions && Object.keys(func.subFunctions).length > 0"
    >
      <div>子命令：</div>
      <ul>
        <li v-for="(subFunc, index) in func.subFunctions" :key="index">
          {{ subFunc.functionName }}
          {{ subFunc.functionNameC }}
        </li>
      </ul>
    </template>
    <template v-if="func.params && func.params.length > 0">
      <div>参数列表：</div>
      <ul>
        <li v-for="(param, index) in func.params" :key="index">
          {{ param.key }}
          {{ param.desc }}
          {{ param.required ? "必填" : "可选" }}
        </li>
      </ul>
    </template>
    <template v-if="func.options?.length > 0">
      <div>功能选项：</div>
      <ul>
        <li v-for="(option, index) in func.options" :key="index">
          {{ option.key }}
          {{ option.desc }}
          {{ getOptionKeyList(option).join(" | ") }}
          {{ option.required ? "必填" : "可选" }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { FunctionDetails } from "../../../functions";
import { getHelpString, getOptionKeyList } from "./spliceHelp";
interface HelpProps {
  func: FunctionDetails;
  parentfunc: FunctionDetails;
}

const props = withDefaults(defineProps<HelpProps>(), {});
const { func, parentfunc } = toRefs(props);
const helpStr = computed(() => {
  return getHelpString(func.value, parentfunc.value);
});
</script>

<style>
</style>