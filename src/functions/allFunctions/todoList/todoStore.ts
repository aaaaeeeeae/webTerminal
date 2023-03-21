import { defineStore } from "pinia";
import {todoType} from './tododefined'

export const todoListStore = defineStore("todo", {
    state: () => {
        return {
            todoList: [
                {
                    thing: '待完成的事情',
                    isFinished: false,
                    desc: '详细信息',
                    createTime: new Date(),
                },
                {
                    thing: '已经完成的事情',
                    isFinished: true,
                    desc: '详细信息',
                    createTime: new Date(),
                },
            ] as todoType[],
        }
    },
    actions: {
        deleteTodo(index: number) {
            if (index < 0 || index >= this.todoList.length) {
                return false;
            } this.todoList.splice(index, 1)
            return true;
        },
        addTodo(newItem: todoType) {
            this.todoList.push(newItem)
        }
    },
    // 开启数据缓存
    persist: {
        key: "todo-store",
        storage: window.localStorage,
    }
})