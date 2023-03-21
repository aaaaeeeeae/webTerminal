import { FunctionDetails } from '../../../functions'
import { defineAsyncComponent } from 'vue'
import getopts from 'getopts';
const information: FunctionDetails = {
    // 命令名英文
    functionName: 'information',
    // 命令名中文
    functionNameC: '本站信息',
    // 描述
    desc:'',
    // 命令别名
    alias: ['info'],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const componentFunc: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./info.vue")),
        };
        terminal.writeDirect(componentFunc)
        return;
    },
    // 是否允许折叠
    collapsible: true

}
export default information;