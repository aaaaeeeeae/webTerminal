import { FunctionDetails, FunctionOptionType } from "../../../functions"
// 建立命令提示字符串
export const getHelpString = (
    func: FunctionDetails,
    parentFunc?: FunctionDetails
) => {
    let helpStr = ""
    // 如果有父命令
    if (parentFunc) {
        helpStr += parentFunc.functionName + " "
    }
    // 命令拼接
    helpStr += func.functionName
    // 如果命令有参数
    if (func.params && func.params.length > 0) {
        const paramsList: string[] = func.params.map(params => {
            // 让word先等于key值
            let word = params.key
            // 如果存在详细描述，那就让详细描述取代key
            if (params.desc) {
                word = params.desc
            }
            // 参数是否为必须
            if (params.required) {
                return `<${word}>`
            } else {
                return `[${word}]`
            }
        })
        helpStr += " " + paramsList.join(" ")
    }
    // 如果有选项命令
    if (func.options?.length > 0) {
        const optionList: string[] = func.options.map(opt => {
            const optionKey = getOptionKey(opt)
            // 让参数先等于key
            let word = opt.key;
            // 如果有详细描述替代为详细描述
            if (opt.desc) {
                word = opt.desc;
            }
            if (opt.required) {
                return `<${optionKey} ${word}>`
            }else{
                return `[${optionKey} ${word}]`
            }
        })
        helpStr += " " + optionList.join(" ")
    }
    return helpStr
}
// 获取option的functionName
export const getOptionKey = (option: FunctionOptionType) => {
    // 优先用简写
    if (option.keyAlias && option.keyAlias.length > 0) {
        return "-" + option.keyAlias[0];
    }
    return "--" + option.key;
};
// 获取option的functionName(返回一个list)
export const getOptionKeyList = (option: FunctionOptionType) => {
    let list = []
    // 优先用简写
    if (option.keyAlias && option.keyAlias.length > 0) {
        list.push("-" + option.keyAlias[0]);
    }
    list.push("--" + option.key)
    return list
}