import { FunctionDetails } from '../../functions'
import { defineAsyncComponent } from 'vue'
import getopts from 'getopts';
const todoList: FunctionDetails = {
    // 命令名英文
    functionName: 'todo',
    // 命令名中文
    functionNameC: '待办事务',
    // 命令别名
    alias: [],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const componentFunc: TerminalStandard.ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./todo.vue")),
        };
        terminal.writeDirect(componentFunc)
        return;
    },
    // 是否允许折叠
    collapsible: true

}
export default todoList;