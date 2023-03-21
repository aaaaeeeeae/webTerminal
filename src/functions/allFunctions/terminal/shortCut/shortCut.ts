import { FunctionDetails } from '../../../functions'
import { defineAsyncComponent } from 'vue'
import getopts from 'getopts';
const shortCut: FunctionDetails = {
    // 命令名英文
    functionName: 'shortcut',
    // 命令名中文
    functionNameC: '快捷键列表',
    // 描述
    desc:'查看可供使用的快捷键',
    // 命令别名
    alias: [],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const componentFunc: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./shortCut.vue")),
        };
        terminal.writeDirect(componentFunc)
        return;
    },
    // 是否允许折叠
    collapsible: true

}
export default shortCut;