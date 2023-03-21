import { FunctionDetails } from '../../../functions'
import { defineAsyncComponent } from 'vue'
import { functionMap } from '../../../functionRegister'
const help: FunctionDetails = {
    // 命令名英文
    functionName: 'help',
    // 命令名中文
    functionNameC: '帮助列表',
    // 命令别名
    alias: [],
    // 描述
    desc:"可查看有哪些命令",
    // 参数
    params: [
        {
            key: "functionName",
            desc: "命令名",
            required: false,
        },
    ],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option, terminal, parentFunc) => {
        // 如果只输入了help（查看所有命令）
        if (option._.length < 1) {
            const output: TerminalStandard.ComponentOutputType = {
                type: "component",
                component: defineAsyncComponent(() => import("./helpAllFunc.vue")),
            };
            terminal.writeDirect(output);
            return;
        }
        let text = option._[0]
        let funcMap = functionMap
        // 如果查询的是子命令的功能
        if (parentFunc && parentFunc.subFunctions && Object.keys(parentFunc.subFunctions).length > 0){
            // 从父命令里找子命令
            funcMap = parentFunc.subFunctions
        }
        let func = funcMap[text]
        // 如果不存在该命令
        if (!func){
            terminal.writeError("找不到指定命令")
            return
        }
        const output: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./helpSingleFunc.vue")),
            props:{
                func,
                parentFunc
            }
        };
        terminal.writeDirect(output);
    },
    // 是否允许折叠
    collapsible: true

}
export default help;