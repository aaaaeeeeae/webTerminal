import getopts from 'getopts';
import { functionMap } from './functionRegister'
import { FunctionDetails, FunctionOptionType } from './functions'

export const preanalysis = async (text: string,
    terminal: TerminalStandard.TerminalFunc,
    parentFunc?: FunctionDetails) => {
    // 去除开头结尾空格
    text.trim();
    if (!text) {
        return;
    }
    // 查找是否有存在这个命令
    const funcName = serchFunction(text, parentFunc);
    // 如果找不到命令
    if (!funcName) {
        // 调用错误文本函数
        terminal.writeError('该命令不存在')
        return;
    }
    // 对命令进行参数解析处理，便于后续执行
    const disposedOptions = doParse(text, funcName.options)
    // 如果有子命令，递归处理
    if (disposedOptions._.length > 0 &&
        funcName.subFunctions &&
        Object.keys(funcName.subFunctions).length > 0) {
        const subFun = text.substring(text.indexOf(' ') + 1)
        await preanalysis(subFun, terminal, funcName)
        return;
    }
    // 调用命令
    await doAction(funcName, disposedOptions, terminal, parentFunc)
}

// 寻找命令
export const serchFunction = (text: string, parentFunc?: FunctionDetails): FunctionDetails => {
    let head = text.split(" ", 1)[0].toLowerCase();
    let map = functionMap
    // 如果有父命令，在父命令中寻找
    if (parentFunc && parentFunc.subFunctions && Object.keys(parentFunc.subFunctions).length > 0) {
        map = parentFunc.subFunctions
    }
    let currFunction = map[head]
    return currFunction
}

// 解析命令
export const doParse = (text: string,
    options: FunctionOptionType[])
    : getopts.ParsedOptions => {
    // 处理命令后的字符串
    const disposed = text.split(' ').slice(1)
    // 调用第三方库getopts中的Options,按命令的options参数格式化
    const opt: getopts.Options = {
        alias: {},
        // default: {},
        // string: [],
        // boolean: [],
    };

    options.forEach(option => {
        if (option.keyAlias && opt.alias) {
            opt.alias[option.key] = option.keyAlias
        }
    })
    // 将text按getopts中的options处理
    const disposedOptions = getopts(disposed, opt)
    console.log("变换后的option为");
    console.log(disposedOptions);
    return disposedOptions
}

// 调用命令
const doAction = async (funcName: FunctionDetails,
    disposedOptions: getopts.ParsedOptions,
    terminal: TerminalStandard.TerminalFunc,
    parentFunc?: FunctionDetails) => {
    // 设置可以折叠
    if (funcName.collapsible) {
        terminal.setCollapsible(true)
    }
    await funcName.action(disposedOptions, terminal, parentFunc)
}

