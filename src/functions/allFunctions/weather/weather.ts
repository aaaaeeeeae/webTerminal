import { FunctionDetails } from '../../functions'
import getopts from 'getopts';
import { defineAsyncComponent } from 'vue'
import location from './location'
const weather: FunctionDetails = {
    // 命令名英文
    functionName: 'weather',
    // 命令名中文
    functionNameC: '今日天气',
    // 命令别名
    alias: ['tianqi', 'wendu'],
    // 描述
    desc: "查看各省份今日天气",
    // 参数
    params: [
        {
            key: "subCommand",
            desc: "子命令",
            required: false,
        },
    ],
    // 命令选项列表
    options: [],
    // 子命令
    subFunctions: {
        loc: location
    },
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        if (option._.length < 1) {
            const componentFunc: TerminalStandard.ComponentOutputType = {
                type: "component",
                component: defineAsyncComponent(() => import("./weather.vue")),
            };
            terminal.writeDirect(componentFunc)
            return;
        }

    },
    // 是否允许折叠
    collapsible: true

}
export default weather;