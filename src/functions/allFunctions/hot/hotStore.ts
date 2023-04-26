import { defineStore } from "pinia";
import axios from "axios";
interface paramsD {
    key: string
}
export interface hotDefine {
    // 热搜话题
    hotword: string;
    // 热搜指数
    hotwordnum: string;
    // 	热搜标签
    hottag: string

}
export const hotStore = defineStore("hot", {
    state: () => {
        return {
            params: {
                key: 'b6aa439da8e05694811cbe5009038c12'
            } as paramsD,
            hotData: [] as hotDefine[],
        }
    },
    actions: {
        getData() {
            axios({
                method: "GET",
                url: `https://apis.tianapi.com/weibohot/index?key=${this.params.key}`
            }).then(response => {
                console.log(response);
                if (response.status == 200) {
                    const list = response.data.result.list.slice(0,10)
                    this.hotData = list
                    console.log(list);
                    // console.log(this.hotData);
                    // list.forEach(item => {
                    //     this.hotData.push(item)
                    // });
                    // console.log(this.hotData);
                }
            })
        },
    }
})