import { FunctionDetails } from '../../functions'
import { weatherStore } from "./weatherStore";
import getopts from 'getopts';
const location: FunctionDetails = {
    // 命令名英文
    functionName: 'loc',
    // 命令名中文
    functionNameC: '地点',
    // 命令选项列表
    options: [
        {
            // 选项名
            key: "city",
            // 描述
            desc: "居住地",
            // 选项别名
            keyAlias: ['c'],
            required: true
        }],
    // 执行命令
    action: async (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        const { remakeAdcode } = weatherStore()
        if (!option.city) {
            terminal.writeError("请输入正确的省份，例如'北京' '上海'")
        } else {
            let flag = remakeAdcode(option.city)
            if (!flag) {
                terminal.writeError("请输入正确的省份，例如'北京' '上海'")
            } else {
                terminal.writeSuccess("已成功重设居住地")
            }
        }
        return;
    },
    // 是否允许折叠
    collapsible: false

}
export default location;