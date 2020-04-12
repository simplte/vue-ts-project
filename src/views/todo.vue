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
        @on-saveType2="handleSave2"
        @on-complete="complete"
      ></todo-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "../components/todo-item";
import { State, Mutation } from "vuex-class";

@Component({
  name: "todoPage",
  components: {
    TodoItem
  }
})
export default class todoPage extends Vue {
  public edittingIndex = -1;
  // vuex的使用
  @State("todoList") public list;
  @Mutation("updateList") public updateTodoList;
  @Mutation("todoComplete") public todoItemComplete;
  public handleSave({ index, content }) {
    console.log(index, content);
    // this.list[index].text = content;
    this.updateTodoList({ index, content });
    this.handleCancel();
  }
  public handleEdit(index) {
    this.edittingIndex = index;
    console.log(index);
  }
  public handleCancel() {
    this.edittingIndex = -1;
  }
  public handleSave2({ index, content }) {
    console.log(index, content);
    this.list[index].text = content;
    this.handleCancel();
  }
  public complete(index) {
    this.todoItemComplete(index);
    // this.list[index].complete = !this.list[index].complete;
  }
}
</script>
