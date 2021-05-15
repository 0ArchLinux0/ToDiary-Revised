<template>
  <div class="flex flex-col justify-start items-center w-full h-full">
    <div 
      id="title" 
      class="flex justify-center bg-red-200 items-center text-4xl shadowShort mt-2"
      style="margin-bottom: 3.5%"
    >
      todo checklist
    </div>
    <div class="relative flex w-10/12 justify-center mb-1 text-xl">
      <span class="absolute left-0 text-2xl"> progress: {{progress}} </span>
      <div class="flex">
        <div class="mr-1">
          Public
        </div>
        <input 
          type="checkbox"
          id="toggle-slider"
        />
        <label for="toggle-slider"/>
      </div>
      <!-- <div class="absolute w-full flex justify-end items-center"> -->
        <button
          class="absolute right-0 bg-blue-400 px-4"
          style="border-radius: 2px; rem;"
          @click="save"
        >
          save
        </button>
      <!-- </div> -->
    </div>
    <div
      class="relative w-full"
    >
      <PostIt 
        :initial="true"
        :inputActive="inputActive"
        @addToList="addToList"
      />
    </div>
    <div
      class="relative w-full text-xl my-5"
    >
      <!-- style="min-height: 200px" -->
      ---------Have to do---------
      <div
        v-for="todo of haveTodos"
        :key="`haveTodo-${todo.idx}`"
        class="relative w-full"
      >
      <!-- bg-red-300 -->
        <PostIt
          :body="todo.todo"
          :keyIdx="todo.idx"
          :completed="false"
          @added="added"
          @toggletodo="toggletodo"
        />
      </div>
    </div>

    <div
      class="relative w-full text-xl mt-5"
    >
      <!-- style="min-height: 200px" -->
      ---------Completed!---------
      <div
        v-for="todo of completedTodos"
        :key="`complete-${todo.idx}`"
        class="relative w-full"
      >
        <PostIt
          :body="todo.todo"
          :keyIdx="todo.idx"
          :completed="true"
          @added="added"
          @toggletodo="toggletodo"
        />
      </div>
    </div>
      
  </div>
</template>
<script>
import PostIt from '../components/PostIt.vue'
// import Vue from "vue";
export default {
  name: 'TodoList',
  components: {
    PostIt,
  },
  props: {
    msg: String
  },
  computed: {
    progress() {
      if(!this.todos.length) return `0/0 (0%)` 
      const completedItems = this.todos.reduce((acc, item) => {
        return acc + (item.completed&1)
      }, 0);
      return `${completedItems}/${this.todos.length}`
      + `(${(completedItems/this.todos.length*100).toFixed(1)}%)`
    },
    haveTodos() {
      const haveTodos = [];
      for(const idx in this.todos) {
        if(!this.todos[idx].completed) haveTodos.push({
          todo: this.todos[idx].todo,
          idx: Number(idx),
        })
      }
      return haveTodos
    },
    completedTodos() {
      const completedTodos = [];
      for(const idx in this.todos) {
        if(this.todos[idx].completed) completedTodos.push({
          todo: this.todos[idx].todo,
          idx: Number(idx),
        })
      }
      console.log("left")
      console.log(JSON.stringify(this.haveTodos))
      console.log("completed")
      console.log(JSON.stringify(completedTodos))
      return completedTodos;
    }
  },
  methods: {
    addToList(todo) {
      console.log("event emited")
      this.todos.push({
        todo: todo,
        completed: false,
      })
      this.inputActive = false;
    },
    added() {
      this.inputActive = true;
    },
    toggletodo(idx) {
      console.log("toggled " + idx)
      console.log(this.todos[idx])
      // console.log('idx'+idx)
      this.todos[idx]["completed"] = !this.todos[idx].completed;
    }
  },
  mounted() {

  },
  data() {
    return {
      newMemo: "add todo!",
      todos: [],
      inputActive: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  background-color: transparent;
  outline: none;
  border: none;
}
input:focus {
  color: grey;
}
#toggle-slider { display: none;}
label {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 36px;
  min-height: 18px;
  max-height: 18px;
  border: solid 0px black;
  cursor: pointer;
  background-color: grey;
  border-radius: 9px;
  transition: 0.4s ease-out; 
}
label:after {
  content: '';
  right: 1px;
  width: 12px;
  height: 12px;
  background-color: #fafafa;
  border-radius: 50%;
  position: absolute;
  transition: 0.4s ease-out;
}
#toggle-slider:checked + label {
  background-color: rgb(68, 201, 241);
}
#toggle-slider:checked + label:after {
  background-color: #fafafa;
  right: 20px;
}
.shadow {
  box-shadow: 1.5rem 1.5rem 5px grey;
}
.shadowShort {
  box-shadow: 0.7rem 0.7rem 5px grey;
}
/* .shadow1 { */
  /* box-shadow: 9px 12px 5px grey; */
/* } */
/* .shadow2 { */
  /* box-shadow: 9px 12px 5px grey; */
/* } */
.bottom {
  transform: skewX(45deg)  translateX(0.35rem);
}
.right {
  transform: skewY(45deg)  translateY(0.35rem);
}
</style>
