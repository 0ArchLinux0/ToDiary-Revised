<template>
  <div class="flex flex-col justify-start items-center w-full">
    <div 
      id="title" 
      class="flex justify-center bg-red-200 items-center px-3 text-4xl shadowShort mt-2"
      style="margin-bottom: 3.5%"
    >
      todo checklist
    </div>
    <div v-if="isMobile" class="relative flex w-10/12 justify-end mb-1 text-xl">
      <span class="absolute left-0 text-2xl"> progress: {{progress}} </span>
      <div class="flex items-center">
        <div class="mr-2">
          Public
        </div>
        <input 
          type="checkbox"
          :checked="isPublic"
          id="toggle-slider"
        />
        <label for="toggle-slider"/>
        <button
          class="bg-blue-300 px-4 ml-2"
          style="border-radius: 3px; rem;"
          @click="save"
        >
          save
        </button>
      </div>
    </div>
    <div v-else class="relative flex w-10/12 justify-center mb-1 text-xl">
      <span class="absolute left-0 text-2xl"> progress: {{progress}} </span>
      <div class="flex items-center">
        <div class="mr-2">
          Public
        </div>
        <input 
          type="checkbox"
          :checked="isPublic"
          id="toggle-slider"
        />
        <label for="toggle-slider"/>
      </div>
       <div class="absolute w-full flex justify-end items-center"> -->
      <button
        class="absolute right-0 bg-blue-300 px-4"
        style="border-radius: 3px; rem;"
        @click="save"
      >
        save
      </button> 
      </div>
    </div> 
    <div
      class="relative w-full"
    >
      <PostIt 
        :initial="true"
        @addToList="addToList"
      />
        <!-- :inputActive="inputActive" -->
    </div>
    <div
      v-if="todos.length"
      class="w-full"
    >
      <div
        class="relative w-full text-xl my-5"
        style="min-height: 200px"
      >
        ---------Have to do---------
        <div
          v-for="todo of haveTodos"
          :key="`${keyPrefix[todo.idx]}-haveTodo-${todo.idx}`"
          class="relative w-full"
        >
        <!-- bg-red-300 -->
          <PostIt
            :body="todo.todo"
            :keyIdx="todo.idx"
            :completed="false"
            @delete="deleteTodo"
            @toggletodo="toggletodo"
          />
            <!-- @added="added" -->
        </div>
      </div>

      <div
        class="relative w-full text-xl mt-5"
      >
        <!-- style="min-height: 200px" -->
        ---------Completed!---------
        <div
          v-for="todo of completedTodos"
          :key="`${keyPrefix[todo.idx]}-complete-${todo.idx}`"
          class="relative w-full"
        >
          <PostIt
            :body="todo.todo"
            :keyIdx="todo.idx"
            :completed="true"
            @delete="deleteTodo"
            @toggletodo="toggletodo"
          />
            <!-- @added="added" --> 
        </div>
      </div>
    </div>
      
  </div>
</template>
<script>
import PostIt from '../components/PostIt.vue'
// import ContentService from "@/services/ContentService.js"
import AccountService from "@/services/AccountService.js"
// import md5 from "crypto-js/md5";
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
    todoListDateInfo() {
      const date = new Date();
      const temp = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
      return temp.toISOString().split('T')[0];
    },
    progress() {
      if(!this.todos.length) return `0/0 (0%)` 
      const completedItems = this.todos.reduce((acc, item) => {
        return acc + (item.completed&1)
      }, 0);
      if(this.isMobile) return `(${(completedItems/this.todos.length*100).toFixed(1)}%)`
      else return `${completedItems}/${this.todos.length}`
      + `(${(completedItems/this.todos.length*100).toFixed(1)}%)`
    },
    isMobile() {
      return this.$store.getters["AccountModule/mobile"];
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
      return completedTodos;
    },
    userInfo() {
      return this.$store.getters["AccountModule/userInfo"]
    }
  },
  methods: {
    save() {
      // if(!this.todos || !this.todos.length) return;
      // ContentService.postContent({
      //   dbname: 'content',
      //   collection: "postit",
      //   toWrite: {
      //     _id: md5(
      //       this.userInfo.oid + 
      //       "-" + 
      //       (new Date().getDate() - this.initialDate.getDate()
      //     )).toString(),
      //     todos:this.todos,
      //     isPublic: this.isPublic,
      //     viewer: this.viewer,
      //     savedDate: new Date(),
      //     owner: this.userInfo.oid,
      //   }
      // })
      const toWrite = {};
      toWrite[
        `todolist.${this.todoListDateInfo}`
      ] = {
        todos:this.todos,
        isPublic: this.isPublic,
        viewer: this.viewer,
        owner: this.userInfo.oid,
      }
      AccountService.setAccountData({
        oid: this.userInfo.oid,
        toWrite: toWrite,
      })
    },
    deleteTodo(keyIdx) {
      // console.log(keyIdx);
      // console.log(this.todos[keyIdx]);
      // console.log(JSON.stringify(this.todos));
      // console.log(JSON.stringify(this.todos.slice(0,keyIdx)))
      // console.log(JSON.stringify(this.todos.slice(keyIdx+1)))
      this.todos = [...this.todos.slice(0, keyIdx), ...this.todos.slice(keyIdx+1)];
      // console.log(JSON.stringify(this.todos));
      // console.log(this.haveTodos);
      // console.log(this.completedTodos);
      for(let i=keyIdx; i<this.todos.length; i++ ) {
        this.keyPrefix[i]=this.keyPrefix[i]^1;
      }
      // this.todos.splice(keyIdx,1);
    },
    addToList(todo) {
      // console.log(todo);
      this.todos.push({
        todo: todo,
        completed: false,
      })
      this.keyPrefix.push(0);
      // this.inputActive = false;
    },
    // added() {
      // this.inputActive = true;
    // },
    toggletodo(idx) {
      // console.log(idx);
      // console.log(JSON.stringify(this.todos));
      this.todos[idx]["completed"] = !this.todos[idx].completed;
      this.keyPrefix[idx]=this.keyPrefix[idx]^1;
    }
  },
  mounted() {
    // console.log(this.$route.query);
    const todolistDate = this.$route.query.date ? this.$route.query.date : this.todoListDateInfo;
    // console.log(this.todoListDateInfo)
    // console.log(todolistDate)
    if(this.userInfo)
      AccountService.getInfo(this.userInfo.oid, [`todolist.${todolistDate}`])
        .then(({ data }) => {
          // console.log(data);
          // console.log(todolistDate)
          if(data && data.todolist && Object.keys(data.todolist).length) {
            this.todos = data.todolist[todolistDate].todos
            this.keyPrefix = Array(Object.keys(data.todolist).length).fill(0);
          }
        });
  },
  data() {
    return {
      newMemo: "add todo!",
      todos: [],
      // inputActive: true,
      isPublic: false,
      viewer: [],
      keyPrefix: [],
      // todoListDateInfo: undefined,
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
*:focus {
  outline: none;
}
</style>
