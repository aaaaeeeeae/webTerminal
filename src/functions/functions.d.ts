export interface FunctionDetails {
    // 命令名英文
    functionName: string;
    // 命令名中文
    functionNameC: string;
    // 命令别名
    alias?: string[];
    // 描述
    desc?: string;
    // 参数
    params?:FunctioParamsType[]
    // 命令选项列表
    options: FunctionOptionType[];
    // 子命令
    subFunctions?:Record<string, FunctionDetails>;
    // 执行命令
    action: (options: ParsedOptions,
        terminal?: TerminalType,
        parentFunc?: FunctionDetails) => viod
    // 是否允许折叠
    collapsible?: boolean;

}
// 选项功能
export interface FunctionOptionType {
    // 选项名
    key: string;
    // 描述
    desc?: string;
    // 选项别名
    keyAlias: sting[];
    // 是否必填
    required?: boolean
}
// 相关参数
export interface FunctioParamsType {
    // 参数名
    key: string;
    // 描述
    desc: string;
    // 是否必填
    required?: boolean
}