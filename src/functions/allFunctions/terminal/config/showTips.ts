import { FunctionDetails } from '../../../functions'
import {terminalConfigStore} from './configStore'
import getopts from 'getopts';
const showTips: FunctionDetails = {
    // 命令名英文
    functionName: 'tips',
    // 命令名中文
    functionNameC: '开启/关闭命令提示',
    // 描述
    desc:'',
    // 命令别名
    alias: [],
    // 命令选项列表
    options: [],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const {setIfTips} = terminalConfigStore()
        const res = setIfTips()
        terminal.writeSuccess(`命令提示已${res?'开启':'关闭'}，刷新页面后生效`)
    },
    // 是否允许折叠
    collapsible: false

}
export default showTips;