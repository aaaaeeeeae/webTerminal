// 快捷键
export const registerShortcut = (terminal: TerminalStandard.TerminalFunc) => {
    document.onkeydown = (e) => {
        // 在todo上写东西的话会聚焦到输入框上，因此把它去掉了
        // 判断输入是否是普通按键
        // if (e.key >= 'a' && e.key <= 'z' && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
        //     terminal.autofocus();
        //     return;
        // }
        // console.log(e.code);
        // 匹配功能快捷键
        shortcutList.forEach((shortcut) => {
            if (
                e.code === shortcut.code &&
                e.ctrlKey == !!shortcut.ctrlKey &&
                e.metaKey == !!shortcut.metaKey &&
                e.shiftKey == !!shortcut.shiftKey
            ) {
                shortcut.action(e, terminal);
            }
        })
    }
}
interface ShortcutsType {
    code: string,
    desc: string,
    keyDesc: string,
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    action: (e: Event, terminal: TerminalStandard.TerminalFunc) => void;
}
export const shortcutList: ShortcutsType[] = [
    {
        code: 'KeyR',
        desc: '清除所有记录',
        keyDesc: 'Ctrl + R',
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault()
            terminal.clean()
        }
    },
    {
        code: 'ArrowDown',
        desc: '查看下一条命令',
        keyDesc: '↓',
        action(e, terminal) {
            e.preventDefault()
            terminal.checkNextFunc()
        }
    },
    {
        code: 'ArrowUp',
        desc: '查看上一条命令',
        keyDesc: '↑',
        action(e, terminal) {
            e.preventDefault()
            terminal.checkPreFunc()
        }
    },
    {
        code: "Enter",
        desc: '按enter自动聚焦',
        keyDesc: 'Enter',
        action(e, terminal) {
            terminal.autofocus()
        },
    },
    {
        code: "keyL",
        desc: '展开/折叠所有块',
        keyDesc: 'Ctrl + L',
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault()
            terminal.processFloding()
        },
    },
    {
        code:'Tab',
        desc: '按下Tab填充命令',
        keyDesc: 'Tab',
        action(e, terminal) {
            e.preventDefault()
            terminal.autofocus()
            terminal.setTabTips()
        },
    }
]