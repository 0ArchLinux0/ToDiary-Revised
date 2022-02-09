<template>
  <div class="flex flex-col justify-start items-center w-full">
    <div 
      id="title" 
      class="flex justify-center items-center"
    >
     <div class="text-xl">todolist of</div>
      <div
        class="flex justify-center bg-red-200 items-center px-2 text-3xl shadowShort mt-2 ml-3"
        style="margin-bottom: 3.5%;"
      >
        {{todoListDateInfo}}
      </div>
    </div>
    <div v-if="isMobile" class="relative flex w-10/12 justify-between mb-1 text-xl">
      <div class="left-0 text-2xl"> progress: {{progress.percentage}} </div>
      <div class="flex items-center z-10">
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
      <button
          class="bg-blue-300 px-4 ml-2"
          style="border-radius: 3px;"
          @click="save"
        >
        save
      </button>
    </div>
    <div v-else class="relative flex w-10/12 justify-between mb-1 text-xl">
      <div class=" left-0 text-xl"> progress: {{progress.ratio}}{{progress.percentage}} </div>
      <div class="flex items-center z-10">
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
      <button
        class="right-0 bg-blue-300 px-4"
        style="border-radius: 3px; rem;"
        @click="save"
      >
        save
      </button> 
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
        <!-- <span class="text-white">---------Have to do---------</span> -->
        <span style="color: rgb(253 164 175);">---------Have to do---------</span>
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
        <div 
          v-if="!haveTodos.length && todos.length"
          class="text-5xl text-green-300"
        >
          Congratulation! What a Great job!
        </div>
      </div>

      <div
        class="relative w-full text-xl mt-5"
      >
        <!-- style="min-height: 200px" -->
        <span style="color: rgb(253 164 175);">---------Completed!---------</span>
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
import ContentService from "@/services/ContentService.js"
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
    todaysDate() {
      const date = new Date();
      const temp = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
      return temp.toISOString().split('T')[0];
    },
    todoListDateInfo() {
      return this.$route.params.date ? this.$route.params.date : this.todaysDate;
    },
    datArray() {
      return this.todoListDateInfo.split('-').map(e => Number(e));
    },
    progress() {
      if(!this.todos.length) return `0/0 (0%)` 
      const completedItems = this.todos.reduce((acc, item) => {
        return acc + (item.completed&1)
      }, 0);
      return { 
        percentage: `(${(completedItems/this.todos.length*100).toFixed(1)}%)`,
        ratio: `${completedItems}/${this.todos.length}`
      }
      // else return `$`
      // + `(${(completedItems/this.todos.length*100).toFixed(1)}%)`
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
      if(!this.todos || this.todos.length === 0) return;
      ContentService.postContent({
        collection: "todos",
        content: {
          todos:this.todos,
          isPublic: this.isPublic,
          viewers: this.viewer,
          owner: this.userInfo.oid,
          date: {
            year: this.datArray[0],
            month: this.datArray[1],
            day: this.datArray[2]
          }
        },
        todoListId: this.todoListId,
        useroid: this.userInfo.oid
      })
      .then(({ data }) => {
        if(!this.todoListId) this.todoListId = data
        this.$toast.open({
          position: 'top',
          message: "Saved!",
          type: "success",
          duration: 1300,
          dismissible: true
        });

        this.$store.dispatch("AccountModule/clearTodosMonth", 
        {
          year: this.datArray[0],
          month: this.datArray[1],
        });
      });
    },
    deleteTodo(keyIdx) {
      // console.log(keyIdx);
      // console.log(this.todos[keyIdx]);
      // console.log(JSON.stringify(this.todos));
      // console.log(JSON.stringify(this.todos.slice(0,keyIdx)))
      // console.log(JSON.stringify(this.todos.slice(keyIdx+1)))
      this.todos = [...this.todos.slice(0, keyIdx), ...this.todos.slice(keyIdx+1)];
      this.keyPrefix = [...this.keyPrefix.slice(0,keyIdx), ...this.keyPrefix.slice(keyIdx+1)];
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
      if(this.todos.length > 15) return;
      this.todos.push({
        todo: todo,
        completed: false,
        // isPublic: false,
      })
      this.keyPrefix.push(0);
      // console.log(this.keyPrefix);
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
  async mounted() {
    // console.log(this.$route.query);
    console.log('mounted');
    console.log(this.$route.params);
    console.log(this.datArray);
    // const todolistDate = this.todoListDateInfo ? this.todoListDateInfo : this.todaysDate;

    if(this.userInfo)
      this.todoListId = (await AccountService.getInfo(this.userInfo.oid, [`todoIds.${this.datArray[0]}.${this.datArray[1]}.${this.datArray[2]}`])
        .catch((e) => { console.log(e); })).data.todoIds[this.datArray[0]][this.datArray[1]][this.datArray[2]];
    console.log('list id: ' + this.todoListId);
    if(this.todoListId) {
      const infos = (await ContentService.getContent({
        collection: "todos",
        contentoid: this.todoListId,
      })).data;
      this.isPublic = infos.isPublic;
      this.owner = infos.owner;
      this.viewers = infos.viewers;
      this.todos = infos.todos;
      for(let i = 0; i < this.todos.length; i++) this.keyPrefix.push(0);
      // console.log(infos);
    }
  },
  data() {
    return {
      newMemo: "add todo!",
      todos: [],
      toPush: [],
      toPop: [],
      // inputActive: true,
      isPublic: false,
      viewer: [],
      keyPrefix: [],
      todoListId: null,
      owner: null,
      viewers: null,
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
  outline: none;
  border: none;
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
