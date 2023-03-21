<template>
  <div style="margin: 8px 0; max-width: 600px">
    <a-card body-style="padding: 0 12px">
      <a-input
        style="margin: 15px 0"
        placeholder="Write your to-do like 'thing [desc]' ..."
        @press-enter="submitTodo"
        v-model:value="inputValue"
      ></a-input>
      <a-list
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="todoList"
      >
        <template #renderItem="{ item, index }">
          <a-list-item>
            <template #actions>
              <a key="list-loadmore-edit" @click="deleteItem(index)">Delete</a>
            </template>
            <a-list-item-meta>
              <template #description>
                <p>{{ item.desc }}</p>
                <p>{{ dayjs(item.createTime).format("MM-DD HH:mm:ss") }}</p>
              </template>
              <template #avatar>
                <a-checkbox v-model:checked="item.isFinished"></a-checkbox>
              </template>
              <template #title>
                <a>{{ item.thing }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { todoType } from "./tododefined";
import { storeToRefs } from "pinia";
import { todoListStore } from "./todoStore";
const { todoList, deleteTodo, addTodo } = todoListStore();
var inputValue = ref();
const deleteItem = (index: number) => {
  deleteTodo(index);
};
const submitTodo = () => {
  let inputarr = inputValue.value.split(" ");
  const newTodo: todoType = {
    thing: inputarr[0],
    isFinished: false,
    createTime: new Date(),
    desc: inputarr[1] || "",
  };
  inputValue.value = "";
  addTodo(newTodo);
};
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 300px;
}
</style>
