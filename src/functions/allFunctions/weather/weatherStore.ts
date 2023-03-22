import { defineStore } from "pinia";
import axios from "axios";
interface paramsD {
    city: string,
    key: string
}
export interface weatherDefine{
    province:string,
    city:string,
    adcode:string,
    weather:string,
    temperature:string,
    winddirection:string,
    windpower:string,
    humidity:string,
    reporttime:string
}
export const weatherStore = defineStore("weather", {
    state: () => {
        return {
            params: {
                city: '500000',
                key: 'acab0c6d8017f0b6b43b0a80483d0ac9'
            } as paramsD,
            weatherData: {
                province: "",
                city: "",
                adcode: "",
                weather: "",
                temperature: "",
                winddirection: "",
                windpower: "",
                humidity: "",
                reporttime: ""
            } as weatherDefine,
            adcode: [
                { adcode: "110000", name: "北京" },
                { adcode: "120000", name: "天津" },
                { adcode: "130000", name: "河北" },
                { adcode: "140000", name: "山西" },
                { adcode: "150000", name: "内蒙古" },
                { adcode: "210000", name: "辽宁" },
                { adcode: "220000", name: "吉林" },
                { adcode: "230000", name: "黑龙江" },
                { adcode: "310000", name: "上海" },
                { adcode: "320000", name: "江苏" },
                { adcode: "330000", name: "浙江" },
                { adcode: "340000", name: "安徽" },
                { adcode: "350000", name: "福建" },
                { adcode: "360000", name: "江西" },
                { adcode: "370000", name: "山东" },
                { adcode: "410000", name: "河南" },
                { adcode: "420000", name: "湖北" },
                { adcode: "430000", name: "湖南" },
                { adcode: "440000", name: "广东" },
                { adcode: "450000", name: "广西" },
                { adcode: "460000", name: "海南" },
                { adcode: "500000", name: "重庆" },
                { adcode: "510000", name: "四川" },
                { adcode: "520000", name: "贵州" },
                { adcode: "530000", name: "云南" },
                { adcode: "540000", name: "西藏" },
                { adcode: "610000", name: "陕西" },
                { adcode: "620000", name: "甘肃" },
                { adcode: "630000", name: "青海" },
                { adcode: "640000", name: "宁夏" },
                { adcode: "650000", name: "新疆" },
                { adcode: "710000", name: "台湾" },
                { adcode: "810000", name: "香港" },
                { adcode: "820000", name: "澳门" },
            ]
        }
    },
    actions: {
        async getData() {
            if (this.params.city != '') {
                axios({
                    method: "GET",
                    url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${this.params.city}&key=${this.params.key}`
                }).then(response => {
                    if (response.status == 200) {
                        let data = response.data.lives[0]
                        // this.weatherData = data
                        Object.assign(this.weatherData, data)
                    }
                })
            } else {
                console.log('请添加居住地！');
            }
        },
        remakeAdcode(text: string) {
            let flag = false
            this.adcode.forEach((code) => {
                if (code.name == text) {
                    this.params.city = code.adcode
                    flag = true
                }
            })
            this.getData()
            return flag
        }
    }
})
