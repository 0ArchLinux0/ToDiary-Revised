<template>
  <div 
    class="relative flex flex-col justify-start items-center w-full"
    style="padding-top: 3%"  
  >
  <!-- <div v-for="(num, text) in memoinfo">
  </div> -->
  <!-- <div class="absolute top-0 w-full text-center text-3xl"> Todolists </div> -->
  <div class="w-full flex justify-around items-start">
    <div class="flex flex-col justify-start items-center text-center text-2xl"> 
      <span class="mb-4 text-4xl">Todolists</span> 
      <button 
        v-for="(date,idx) of todos"
        :key="idx"
        @click="seeTodoDetails(date)"
      >
        {{date}}
      </button>
    </div>
    <div class="flex flex-col justify-start items-center text-xl"> 
      <span class="mb-4 text-4xl">Memos</span> <br> 
       Memo will be ready soon 
      <!-- <button 
        v-for="(memoInfo,idx) of memos"
        :key="idx"
        @click="seeTodoDetails(memoInfo.oid)"
      >
        {{memoInfo.title}}
      </button> -->
    </div>
      
  </div>
  
  </div>

</template>
<script>
// import PostIt from '../components/PostIt.vue'
import AccountService from "@/services/AccountService.js"
export default {
  name: 'MyPage',
  components: {
    // PostIt,
  },
  props: {
    msg: String
  },
  computed: {
    dateToday() {
      const date = new Date();
      const temp = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
      return temp.toISOString().split('T')[0];
    },
    userInfo() {
      return this.$store.getters["AccountModule/userInfo"]
    }
  },
  methods: {
    seeTodoDetails(date) {
      console.log(date)
      this.$router.push({ path: `/todo/${date}` })
    }
  },
  mounted() {
  //  if(this.userInfo)
  //     AccountService.getInfo(this.userInfo.oid, [`todolist`])//TODO: only get field date in todolist so much waste now
  //       .then(({ data }) => {
  //         if(!data || !data.todolist) return;
  //         const keys = Object.keys(data.todolist)
  //         const len = keys.length;
  //         if(len) 
  //           for(let i = 0; i  < len; i++)
  //             this.todos[i] = keys[len-1-i];
  //       });

  if (this.userInfo) {
        AccountService.getInfo(this.userInfo.oid, [
          `todoIds`,
        ])
          .then(({ data }) => {
            const todoListIds = data?.todoIds;
            console.log('todolist');
            console.log(todoListIds);
            if(!todoListIds || todoListIds.length == 0) return;
            for (const [year, monthdayTodo] of Object.entries(todoListIds)) {
              for(const [month, dayTodo] of Object.entries(monthdayTodo)) {
                for(const day of Object.keys(dayTodo)) {
                  this.todos.push(`${year}-${month.length == 1 ? '0' + month : month}-${day.length == 1 ? '0' + day : day}`);
                }
              }
            }
            // this.completeStatus[year] = {};
            // this.completeStatus[year][month] = {};
            // const promises = [];

            // for (let [day, todoListId] of Object.entries(todoListIds)) {
            //   day = Number(day);
            //   promises.push(new Promise((resolve, reject) => {
            //     ContentService.getContent({
            //       collection: "todos",
            //       contentoid: todoListId,
            //       toGrab: ["todos"],
            //     }).then(({ data }) => {
            //       console.log('get content');
            //       console.log(data);
            //       const infos = data;
            //       this.completeStatus[year][month][day] = [0, 0];
            //       let compleStatusCnt = this.completeStatus[year][month][day];

            //       for (const todoItem of infos.todos) {
            //         todoItem.completed
            //           ? compleStatusCnt[0]++
            //           : compleStatusCnt[1]++;

            //         this.todoLists.push({
            //           key: `key-${idx++}`,
            //           isComplete: todoItem.completed,
            //           dates: new Date(year, month - 1, day),
            //           customData: {
            //             title: todoItem.todo,
            //             class: `${this.randomColor()} text-white ${
            //               todoItem.completed ? "line-through" : ""
            //             }`,
            //           },
            //         });
            //       }
            //       resolve();
            //     })
            //     .catch(() => reject());
            //   }));
            //   }

            //   Promise.all(promises)
            //     .then(() => {
            //       if(this.loadedYearMonths[year] == null) this.loadedYearMonths[year] = {};
            //       this.loadedYearMonths[year][month] = true;
            //       return resolve();
            //     })
            //     .catch(() => {
            //       return reject();
            //     });
            // })
            // .catch((e) => {
            //   console.log(e);
            //   return reject();
            })
        } else return ;
  },
  data() {
    return {
      todos: [],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
