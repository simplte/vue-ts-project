<template>
  <div class="todo">
    <ul>
      <todo-item
        v-for="(item,index) in list"
        :key="'key'+index"
        :item="item"
        :index="index"
        :edittingId="edittingIndex"
        @on-save="handleSave"
        @on-edit="handleEdit"
        @on-cancel="handleCancel"
      ></todo-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "../components/todo-item";

@Component({
  name: "todoPage",
  components: {
    TodoItem
  }
})
export default class todoPage extends Vue {
  public edittingIndex = -1;
  public list = [
    {
      text: "学习ts",
      complete: false
    },
    {
      text: "学习node",
      complete: false
    },
    {
      text: "学习",
      complete: false
    }
  ];
  public handleSave({ index, content }) {
    console.log(index, content);
    this.list[index].text = content;
    this.handleCancel();
  }
  public handleEdit(index) {
    this.edittingIndex = index;
    console.log(index);
  }
  public handleCancel() {
    this.edittingIndex = -1;
  }
}
</script>
