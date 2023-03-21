import { FunctionDetails } from '../../functions'
import getopts from 'getopts'
import { defineAsyncComponent } from 'vue'
const moyuRelax: FunctionDetails = {
    // 命令名英文
    functionName: 'moyu',
    // 命令名中文
    functionNameC: '摸鱼小游戏',
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const componentFunc: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./moyu.vue")),
            props: {},
        };
        terminal.writeDirect(componentFunc)
        return;
    },
    // 是否允许折叠
    collapsible: true

}
export default moyuRelax;