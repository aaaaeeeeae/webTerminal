import { defineStore } from 'pinia'
export const terminalConfigStore = defineStore("terminalConfig", {
    state: () => ({
        // 是否开启提示
        showTips: true,
        // 切换背景
        background: "",
    }),
    getters: {},
    persist: {
        key: "terminal-config-store",
        storage: window.localStorage,
    },
    actions:{
        setBackgound(url:string){
            if (!url){
                return
            }
            this.background = url
        },
        setIfTips():boolean{
            this.showTips = !this.showTips
            return this.showTips
        },
        reset(){
            this.$reset()
        }
    }
})