declare namespace TerminalStandard {
    // 定义一个输入的规范
    interface InputType {
        text: string;
        placeholder?: string;
    }

    // 输出
    interface OutputType {
        type: "command" | "text" | "component";
        text?: string;
        resultList?: OutputType[];
        component?: any;
        state?: OutputStatusType;
        props?: any;
        collapsible?: boolean;
    }

    // 文本类型输出
    interface TextOutputType extends OutputType {
        type: "text";
        text: string;
    }
    // 命令类型输出
    interface CommandOutputType extends OutputType {
        type: "command";
        text: string;
        resultList: OutputType[];
    }
    // 组件类型输出
    interface ComponentOutputType extends OutputType {
        type: "component";
        component: any;
        props?: any;
    }
    // 输出类型（添加输入命令后的开头信息）
    type OutputStatusType = "info" | "success" | "warning" | "error" | "system";

    // 终端有的功能
    interface TerminalFunc {
        // 输入框自动聚焦
        autofocus: () => void
        // 设置是否可以折叠
        setCollapsible: (collapsible: boolean) => void
        // 设置文本输出命令
        writeTextType: (text: string, state?: OutputStatusType) => void
        // 设置失败结果
        writeError: (text: string) => void;
        // 设置成功结果
        writeSuccess: (text: string) => void;
        // 直接输出组件
        writeDirect:(output:TerminalStandard.OutputType) => void;
        // 直接输出文本
        writeDirectText:(text:string,state?: OutputStatusType) => void;
        // 设置查看上一条命令
        checkPreFunc:()=>void
        // 设置查看下一条命令
        checkNextFunc:()=>void
        // 清除所有记录
        clean:() => void
        // 展开/折叠所有块
        processFloding:() => void
        // tap提示
        setTabTips:() => void
    }
}