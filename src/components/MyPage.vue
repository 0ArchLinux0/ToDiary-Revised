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
   if(this.userInfo)
      AccountService.getInfo(this.userInfo.oid, [`todolist`])//TODO: only get field date in todolist so much waste now
        .then(({ data }) => {
          if(!data || !data.todolist) return;
          const keys = Object.keys(data.todolist)
          const len = keys.length;
          if(len) 
            for(let i = 0; i  < len; i++)
              this.todos[i] = keys[len-1-i];
        });
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
