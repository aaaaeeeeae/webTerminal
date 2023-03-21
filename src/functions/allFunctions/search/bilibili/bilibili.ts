import { defineAsyncComponent } from 'vue'
import {FunctionDetails} from '../../../functions'
import getopts from 'getopts';
const bilibiliSerch: FunctionDetails = {
    // 命令名英文
    functionName: 'bilibili',
    // 命令名中文
    functionNameC: 'b站搜索',
    // 命令别名
    alias: ['bzhan', 'bili'],
    // 参数
    params: [
        {
            key: "word",
            desc: "搜索内容",
            required: true,
        },
    ],
    // 命令选项列表
    options: [
        {
            // 选项名
            key: 'self',
            // 描述
            desc: '在当前页面打开',
            // 选项别名
            keyAlias: ['s'],
        },
        {
            // 选项名
            key: 'bvid',
            // 描述
            desc: '通过b站视频id在当前页面播放视频',
            // 选项别名
            keyAlias: ['b'],
        }
    ],
    // 执行命令
    action: (option: getopts.ParsedOptions, terminal: TerminalStandard.TerminalFunc) => {
        if (option.bvid) {
            // 打开视频操作
            const componentFunc: TerminalStandard.ComponentOutputType = {
                type: "component",
                component: defineAsyncComponent(() => import("./bilibiliBox.vue")),
                props: {
                    bvid: option.bvid
                },
            };
            terminal.writeDirect(componentFunc)
            return;
        }
        let keyWord = option._.length > 0 ? option._[0] : ''
        let targetLink = `https://search.bilibili.com/all?keyword=${keyWord}`
        if (option.self) {
            window.location.href = targetLink;
        } else {
            window.open(targetLink);
        }
    },
    // 是否允许折叠
    collapsible: true

}
export default bilibiliSerch;