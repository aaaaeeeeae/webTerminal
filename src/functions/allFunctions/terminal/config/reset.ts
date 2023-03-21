import { FunctionDetails } from '../../../functions'
import { terminalConfigStore } from './configStore'
import getopts from 'getopts';
const reset: FunctionDetails = {
    // 命令名英文
    functionName: 'reset',
    // 命令名中文
    functionNameC: '终端设置还原',
    // 描述
    desc: '可还原背景图片、是否开启提示相关功能',
    // 命令别名
    alias: [],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const { reset } = terminalConfigStore()
        reset()
        terminal.writeSuccess("已重设终端配置，请刷新页面")
    },
    // 是否允许折叠
    collapsible: false

}
export default reset;