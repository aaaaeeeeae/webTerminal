<template>
  <div class="outputContent">
    <!-- 输出结果 -->
    <template v-if="outres.type == 'text'">
      <a-tag :color="getColor">{{ outres.state }}</a-tag>
      <span v-html="smartText(outres.text)"></span>
    </template>
    <!-- 按需加载组件 -->
    <component
      :is="outres.component"
      v-if="outres.type == 'component'"
      v-bind="outres.props ?? {}"
    ></component>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps, toRefs } from "vue";
import OutputType = TerminalStandard.OutputType;
import smartText from '../utils/regText'
const props = defineProps<{ outres: OutputType }>();
const { outres } = toRefs(props);
console.log(outres);
const getColor = computed(() => {
  if (!outres.value.state) {
    return "";
  }
  switch (outres.value.state) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#c0300f";
    case "system":
      return "#bfc4c9";
    default:
      return "";
  }
});
</script>

<style scoped>
.outputContent:deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>