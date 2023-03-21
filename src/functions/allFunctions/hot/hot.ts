import { FunctionDetails } from '../../functions'
import { defineAsyncComponent } from 'vue'
import getopts from 'getopts';
const hotList: FunctionDetails = {
    // 命令名英文
    functionName: 'hot',
    // 命令名中文
    functionNameC: '微博热搜',
    // 命令别名
    alias: [],
    desc:"查看今日微博热搜(半小时更新一次)",
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const componentFunc: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./hot.vue")),
        };
        terminal.writeDirect(componentFunc)
        return;
    },
    // 是否允许折叠
    collapsible: true

}
export default hotList;