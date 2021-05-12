<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center bg-red-200 items-center text-4xl shadow"
      style="margin-bottom: 10%"
    >
      todo checklist
    </div>
    <div class=flex>
      <span class="mr-1">Public</span>
      <input 
        type="checkbox"
        id="toggle-slider"
      />
      <label for="toggle-slider"/>
    </div>
    <button
      @click="save()"
      class="bg-blue-400 my-2 px-2"
      style="border-radius: 2px;"
    >
      save
    </button>
    <div
      class="relative w-full bg-red-300"
    >
      <PostIt 
        :initial="true"
        @addToList=addToList
      />
    </div>
    <div
      class="relative w-full bg-green-300"
      style="min-height: 200px"
    >
      list comes
      <div
        v-for="(todo, idx) in todos"
        :key="`memo${idx}`"
        class="relative w-full bg-red-300"
      >
        <PostIt
          :body="todo"
        />
      </div>
    </div>
      
  </div>
</template>
<script>
import PostIt from '../components/PostIt.vue'
export default {
  name: 'TodoList',
  components: {
    PostIt,
  },
  props: {
    msg: String
  },
  methods: {
    addToList(todo) {
      console.log("event emited")
      this.todos.push(todo)
    },
  },
  mounted() {

  },
  data() {
    return {
      newMemo: "add todo!",
      todos: [],
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
  border: solid 1px black;
  cursor: pointer;
  background-color: white;
  border-radius: 9px;
  transition: 0.4s ease-out; 
}
label:after {
  content: '';
  right: 1px;
  width: 12px;
  height: 12px;
  background-color: grey;
  border-radius: 50%;
  position: absolute;
  transition: 0.4s ease-out;
}
#toggle-slider:checked + label {
  background-color: rgb(68, 201, 241);
}
#toggle-slider:checked + label:after {
  background-color: #5997e2;
  right: 20px;
}
.shadow {
  box-shadow: 1.5rem 1.5rem 5px grey;
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
