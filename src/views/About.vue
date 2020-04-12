<template>
  <div class="about">
    <p
      v-for="(item,index) in list"
      :key="'to_'+index"
      :style="{textDecoration:item.complete?'line-through':''}"
    >{{item.text}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  name: "About",
  components: {}
})
export default class About extends Vue {
  // vuex的使用
  @State("todoList") public list;
}
</script>
