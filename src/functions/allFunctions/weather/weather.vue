<template>
  <a-card hoverable style="width: 240px">
    <template #cover>
      <img :src="src" />
    </template>
    <a-card-meta class="card">
      <template #title>
        <span style="font-size: 25px">{{ weatherData.temperature }}℃</span>
      </template>
      <template #description>
        <span>{{ weatherData.city }}</span>
        <div class="line"></div>
        <i :class="icon"></i>
        <span class="weather">{{ weatherData.weather }}</span>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang='ts'>
import { computed, onMounted, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { weatherStore } from "./weatherStore";
const { getData, weatherData } = weatherStore();
var date = new Date();
var src = computed(() => {
  let src = "";
  let hour = date.getHours();
  if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour < 6)) {
    src = "night";
  } else {
    src = "up";
  }
  let base = `/${src}.jpg`;
  return base;
});
var icon = computed(() => {
  var base;
  if (weatherData.weather.indexOf("晴")>=0) {
    console.log(weatherData.weather.indexOf("晴"));
    base = "iconfont icon-tianqi-qing";
  } else if (weatherData.weather.indexOf("雨")>=0) {
    console.log(weatherData.weather.indexOf("雨"));
    base = "iconfont icon-weather";
  }else{
    base = "iconfont icon-tianqi";
  }
  return base;
});
onMounted(async () => {
  await getData();
});
</script>

<style scoped>
.card {
  position: relative;
}
i {
  /* float: left; */
  font-size: 50px;
  position: absolute;
  top: -30%;
  right: 2%;
}
.line {
  width: 1px;
  height: 100%;
  border: 0.5px solid rgb(207, 205, 205);
  position: absolute;
  top: 0;
  left: 54%;
}
.weather {
  position: absolute;
  right: 10%;
  top: 65%;
  font-size: 16px;
}
</style>