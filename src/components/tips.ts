import { functionMap } from '../functions/functionRegister'
import { getHelpString } from '../functions/allFunctions/terminal/help/spliceHelp'
import _, { trim } from "lodash";
import { ref } from 'vue'
import {terminalConfigStore} from '../functions/allFunctions/terminal/config/configStore'
// 提示信息
const getTips = () => {
    const tip = ref("")
    const setTips = _.debounce((inputText: string) => {
        const {showTips} = terminalConfigStore()
        // 如果未开启提示
        if (!showTips){
            tip.value = ""
            return;
        } 
        // 如果当前输入为空，不提示
        if (!inputText) {
            tip.value = ""
            return
        }
        // 将输入转换成数组
        const text = trim(inputText).split(" ")
        // 得到前缀功能名
        let prefix = text[0].toLowerCase()
        // 在所有功能中匹配第一个
        let likeFunc = Object.keys(functionMap).filter(key => {
            return key.startsWith(prefix)
        })[0]
        let func = functionMap[likeFunc]
        // 如果找不到命令
        if (!func) {
            tip.value = "找不到命令"
            return
        }
        // 如果存在子命令
        if (func.subFunctions &&
            Object.keys(func.subFunctions).length > 0 &&
            text.length > 1) {
            tip.value = getHelpString(func.subFunctions[text[1]], func)
        } else {
            tip.value = getHelpString(func)
        }
    }, 500)
    return {
        tip, setTips
    }
}
export default getTips;