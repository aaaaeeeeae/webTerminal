import { FunctionDetails } from '../../functions'
const baiduSerchFun: FunctionDetails = {
    // 命令名英文
    functionName: 'baidu',
    // 命令名中文
    functionNameC: '百度搜索',
    // 命令别名
    alias: [],
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
            key: 'picture',
            // 描述
            desc: '搜索的是否是图片',
            // 选项别名
            keyAlias: ['p'],
        }
    ],
    // 执行命令
    action: (option, terminal) => {
        let keyWord = option._.length > 0 ? option._[0] : ''
        let targetLink = `https://www.baidu.com/s?wd=${keyWord}`
        if (option.picture) {
            targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${keyWord}`;
        }
        if (option.self) {
            window.location.href = targetLink;
        } else {
            window.open(targetLink);
        }
    },
    // 是否允许折叠
    collapsible: false

}
export default baiduSerchFun;