<template>
  <!-- 处理背景 -->
  <div class="terminal-wrapper" @click="clickfocusInput">
    <div class="terminal" :style="mainStyle" ref="terminalDiv">
      <!-- 输出框 -->
      <a-collapse
        v-model:activeKey="activeKey"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 这里是要折叠的情况 -->
          <a-collapse-panel
            :key="index"
            v-if="output.collapsible"
            class="terminal-row"
          >
            <!-- 命令当做头部内容 -->
            <template #header>
              <span style="user-select: none; margin-right: 10px"
                >[$localhost]</span
              >
              <span>{{ output.text }}</span>
            </template>
            <!-- 结果内容 -->
            <div
              class="terminal-row"
              v-for="(outputRes, index) in output.resultList"
              :key="index"
            >
              <result :outres="outputRes"></result>
            </div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 如果是命令类型 -->
            <template v-if="output.type == 'command'">
              <!-- 命令当做头部内容 -->
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px"
                  >[$localhost]</span
                >
                <span>{{ output.text }}</span>
              </div>
              <!-- 结果内容 -->
              <div
                class="terminal-row"
                v-for="(outputRes, index) in output.resultList"
                :key="index"
              >
                <result :outres="outputRes"></result>
              </div>
            </template>
            <!-- 如果是其他类型（文本和组件都是没有前缀内容的） -->
            <template v-else>
              <div class="terminal-row">
                <result :outres="output"></result>
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <!-- 输入框 -->
      <div class="terminal-row">
        <a-input
          ref="inputFoucus"
          v-model:value="inputValue.text"
          :placeholder="inputValue.placeholder"
          class="command-input"
          :bordered="false"
          autofocus
          @press-enter="submit"
        >
          <template #addonBefore>
            <span class="command-input-prefix">[$localhost]</span>
          </template>
        </a-input>
      </div>
      <!-- 命令提示行 -->
      <div
        v-if="tip && !isRunnning"
        class="terminal-row"
        style="color: #bbb; margin-left=10px"
      >
        {{ tip }}
      </div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  StyleValue,
  onMounted,
  inject,
  watchEffect,
} from "vue";
import { registerShortcut } from "./shortcut";
import getTips from "./tips";
const { tip, setTips } = getTips();
// 是否正在运行
let isRunnning = ref(false);
// 获取终端界面
let terminalDiv = ref()
// 控制对应下标的折叠面板是否折叠
const activeKey = ref<number[]>([]);
// 父子通信
const submitToCore: any = inject("submitToCore");

// 终端的设定
interface TerminalSettings {
  height?: string | number;
  fullScreen?: boolean;
  onSubmitCommand?: (inputText: string) => void;
}
// 终端的初始化
const props = withDefaults(defineProps<TerminalSettings>(), {
  height: "680px",
  fullScreen: false,
});
// 终端样式
const fullScreenStyle: StyleValue = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
// 给终端绑定初始样式
const mainStyle = computed(() => {
  return props.fullScreen ? fullScreenStyle : { height: props.height };
});

// 输出列表(展示)
const outputList = ref<TerminalStandard.OutputType[]>([]);
// 命令列表(存储命令历史)
const commandList = ref<TerminalStandard.CommandOutputType[]>([]);

// 初始化输入命令
const initInput: TerminalStandard.InputType = {
  text: "",
  placeholder: "",
};
// 获取输入框中的命令
var inputValue = ref<TerminalStandard.InputType>({
  ...initInput,
});
// 当前正在执行的命令
let currentNewCommand: TerminalStandard.CommandOutputType;
// 当前执行命令的下标
var currentIndex = ref(commandList.value.length);

// 按下回车就提交命令
async function submit() {
  isRunnning.value = true;
  // 将提示清除

  const newCommand: TerminalStandard.CommandOutputType = {
    text: inputValue.value.text,
    type: "command",
    resultList: [],
  };
  currentNewCommand = newCommand;
  // 将命令存入输出列表中，如果输入为空要换行
  outputList.value.push(newCommand);
  // 不为空，将其存入命令列表中
  if (inputValue.value.text) {
    // 存入命令列表中
    commandList.value.push(newCommand);
    currentIndex.value = commandList.value.length;
  }
  // 对这个命令进行解析
  await submitToCore(newCommand.text);
  // 重置命令
  inputValue.value = { ...initInput };
  // 默认展开折叠面板
  activeKey.value.push(outputList.value.length - 1);
  // 自动滚到底部
  setTimeout(()=>{
    terminalDiv.value.scrollTop = terminalDiv.value.scrollHeight
  })
  isRunnning.value = false;
}

/* 
    功能相关
 */
// 点击空白自动触发input聚焦
const inputFoucus = ref();
// 输入框聚焦
const autofocus = () => {
  inputFoucus.value.focus();
};
const clickfocusInput = (event: Event) => {
  //@ts-ignore
  if (event.target.className === "terminal") {
    autofocus();
  }
};
// 查看上一条命令
const checkPreFunc = () => {
  // 如果当前命令不为第一条命令，就把input赋值为上次命令的text
  if (currentIndex.value > 0) {
    currentIndex.value--;
    inputValue.value.text = commandList.value[currentIndex.value].text;
  }
};
// 查看下一条命令
const checkNextFunc = () => {
  // 如果当前命令为最后一条命令
  if (currentIndex.value >= commandList.value.length - 1) {
    // 新建命令
    currentIndex.value = commandList.value.length;
    inputValue.value = { ...initInput };
  } else {
    currentIndex.value++;
    inputValue.value.text = commandList.value[currentIndex.value].text;
  }
};
// 一键清屏
const clean = () => {
  outputList.value = [];
};
// 设置是否可以折叠
const setCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible;
};
// 折叠/展开所有块（设置了collapsible：true的才会被折叠或者展开）
const processFloding = () => {
  // 如果activeKey为空（全部被折叠了），就将其展开
  if (activeKey.value.length == 0) {
    activeKey.value = outputList.value.map((_, index) => {
      return index;
    });
  }
};
const setTabTips = () => {
  inputValue.value.text = `${tip.value.split(" ")[0]}${
    tip.value.split(" ").length > 1 ? " " : ""
  }`;
  autofocus();
};
/* 
    输出相关
 */
// 写入文本类型结果
const writeTextType = (
  text: string,
  state?: TerminalStandard.OutputStatusType
) => {
  let newText: TerminalStandard.TextOutputType = {
    type: "text",
    text,
    state,
  };
  currentNewCommand.resultList.push(newText);
};
// 写入错误结果
const writeError = (text: string) => {
  writeTextType(text, "error");
};
// 写入成功结果
const writeSuccess = (text: string) => {
  writeTextType(text, "success");
};
// 直接写入（用于加载组件）
const writeDirect = (output: TerminalStandard.OutputType) => {
  currentNewCommand.resultList.push(output);
};
// 直接写入文本（用于初始化界面输出提示文本）
const writeDirectText = (
  text: string,
  state?: TerminalStandard.OutputStatusType
) => {
  let newText: TerminalStandard.TextOutputType = {
    type: "text",
    text,
    state,
  };
  outputList.value.push(newText);
};
// 自动监视触发提示
watchEffect(() => {
  setTips(inputValue.value.text);
});

// 终端初始化
onMounted(() => {
  registerShortcut(terminal);
  terminal.writeDirectText("初始化成功，欢迎使用网页终端！");
  terminal.writeDirectText("输入'help'可查看所有命令");
  terminal.writeDirectText(
    "点击阅读文档可快速上手：" +
      `<a href="//github.com/aaaaeeeeae/webTerminal/blob/main/README.md" target='_blank'>快速上手</a>`
  );
  terminal.writeDirectText("<br/>");
});

// 注册终端功能
const terminal: TerminalStandard.TerminalFunc = {
  autofocus,
  setCollapsible,
  writeTextType,
  writeError,
  writeSuccess,
  writeDirect,
  writeDirectText,
  checkPreFunc,
  checkNextFunc,
  clean,
  processFloding,
  setTabTips,
};

// 暴露terminal
defineExpose({
  terminal,
});
</script>

<style scoped>
.terminal-wrapper {
  height: 100%;
  background-color: black;
}
.terminal {
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}
/* 这里是修改滚动条的样式 */
.terminal::-webkit-scrollbar {
  display: none;
}
.terminal p {
  font-size: 16px;
  color: white;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
/* 这里是把背景调为无颜色 */
.terminal :deep(.ant-collapse) {
  background: none;
}
/* 删除border边框 */
.terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}
.terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}
.terminal
  :deep(
    .ant-collapse-icon-position-right
      > .ant-collapse-item
      > .ant-collapse-header
  ) {
  color: white;
  padding: 0;
}
.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prefix {
  color: white;
  font-size: 16px;
  background: transparent;
}
</style>
