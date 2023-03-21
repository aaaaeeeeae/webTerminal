<template>
  <div style="width: 500px">
    <a-card>
      <a-list size="small" :data-source="hotData">
        <template #renderItem="{ item,index }">
          <a-list-item>
            <i :class="number(index)"></i>{{ item.hotword
            }}<span>{{ item.hotwordnum }}</span
            ><i :class="className(item.hottag)"></i>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
import { hotStore } from "./hotStore";
const store = hotStore();
const { hotData } = storeToRefs(store);
const { getData } = store;


onMounted(async () => {
  try {
    await getData();
  } catch (error) {
    console.log(error);
  }
});

const className = computed(() => {
  return function (word: string) {
    if (word == "沸") {
      return "iconfont icon-remen floatR";
    } else if (word == "热") {
      return "iconfont icon-remen-copy floatR";
    } else if (word == "新") {
      return "iconfont icon-NEW-copy-copy floatR";
    } else {
      return "";
    }
  };
});
const number = computed(() => {
  return function (num: number) {
    let classNum = "";
    switch (num) {
      case 0:
        classNum = "iconfont icon-icon-test2";
        break;
      case 1:
        classNum = "iconfont icon-icon-test1";
        break;
      case 2:
        classNum = "iconfont icon-icon-test";
        break;
      case 3:
        classNum = "iconfont icon-4";
        break;
      case 4:
        classNum = "iconfont icon-5";
        break;
      case 5:
        classNum = "iconfont icon-6";
        break;
      case 6:
        classNum = "iconfont icon-7";
        break;
      case 7:
        classNum = "iconfont icon-8";
        break;
      case 8:
        classNum = "iconfont icon-9";
        break;
      case 9:
        classNum = "iconfont icon-icon-test3";
        break;
    }
    return classNum
  };
});
</script>

<style scoped>
i {
  /* display: block; */
  margin-right: 15px;
}
span {
  color: rgb(50, 50, 50);
  margin-left: 10px;
  font-size: 9px;
}
.floatR {
  float: right;
}
</style>