import {FunctionDetails} from './functions'
import baiduSerch from './allFunctions/search/baiduSerch'
import bilibiliSerch from './allFunctions/search/bilibili/bilibili'
import csdnSerch from './allFunctions/search/csdn'
import juejinSerch from './allFunctions/search/juejin'
import moyu from './allFunctions/moyu/moyu'
import todoList from './allFunctions/todoList/todo'
import githubSerch from './allFunctions/search/github'
import mdnSerch from './allFunctions/search/mdn'
import kaggleSerch from './allFunctions/search/kaggle'
import weather from './allFunctions/weather/weather'
import help from './allFunctions/terminal/help/help'
import shortcut from './allFunctions/terminal/shortCut/shortCut'
import information from './allFunctions/terminal/info/info'
import tips from './allFunctions/terminal/config/showTips'
import reset from './allFunctions/terminal/config/reset'
import hotList from './allFunctions/hot/hot'
// 命令列表
const functionList: FunctionDetails[] = [
    baiduSerch,
    bilibiliSerch,
    csdnSerch,
    juejinSerch,
    moyu,
    todoList,
    githubSerch,
    mdnSerch,
    kaggleSerch,
    weather,
    hotList,
    help,
    shortcut,
    information,
    tips,
    reset,
]

// 遍历命令列表构建map命令键值
const functionMap: Record<string, FunctionDetails> = {};
functionList.forEach(item => {
    functionMap[item.functionName] = item
    // 把别名也加入map表中
    item.alias?.forEach(alia => {
        functionMap[alia] = item
    })
})
export {functionList,functionMap}