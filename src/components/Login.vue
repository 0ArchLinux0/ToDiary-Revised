<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center items-center text-4xl "
      style="margin-bottom: 30vh"
    >
      Login
    </div>

  <div class="w-full h-full">
    <div class="flex flex-col w-full justify-center items-center text-black " style="height:80%">
      <!-- <div v-if="mobile" class="flex flex-col px-2 w-full justify-between items-center">
        Login view
      </div>
      <div v-else class="flex w-full h-full px-7 justify-between">
        Login view
      
      </div> -->
      <table class="text-xl">
        <th></th>
        <tr>
          <button 
            @click="goRegisteration" 
            class="buttonbox bg-blue-300 px-2 rounded-lg mb-4"
          > 
            register
          </button>
        </tr>
        <tr>
          <button 
          class="w-full buttonbox bg-blue-300 px-2 rounded-lg" 
          @click="googleLoginRequest" 
        >
          login 
        </button>
        </tr>
      </table>
      <!-- <div 
        class="h-10 border-2 border-white my-3 flex justify-center items-center"
        :class="{'w-1/3': mobile, 'w-1/4': !mobile}"
        :style="{'border-color': inputRapper1Onfocus ? 'lightgreen' : 'white'}"
      >
        <input 
          @keypress.enter="moveFocus" 
          @focusin="focusTriggered(1)"
          @focusout="focusTriggered(1)"
          v-model="user_id"
          placeholder="Enter Id"
          type="text"
          class="block w-10/12 inputbox "
          style="spellcheck:false;"
        />
      </div> -->
      <!-- <div 
        class="h-10 border-2 border-white my-3 flex justify-center items-center"
        :class="{'w-1/3': mobile, 'w-1/4': !mobile}"
        :style="{'border-color': inputRapper2Onfocus ? 'lightgreen' : 'white'}">
        <input 
          ref="pw"
          @keypress.enter="login" 
          @focusin="focusTriggered(2)"
          @focusout="focusTriggered(2)"
          v-model="user_pw"
          placeholder="Enter password"
          type="password"
          class="block w-10/12 inputbox "
          style="spellcheck:false;"
        />
      </div> -->
      <div 
        v-if="loginerror" 
        class="text-2xl"
        style="color:red;"
      > 
        {{ errorMsg }}
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AccountService from "@/services/AccountService.js"
export default {
  name: 'Login',
  props: {
    // mobile: {
    //   type: Boolean,
    //   default: true,
    // }
  },
  computed: {
  },
  methods: {
    moveFocus() {
      this.$refs.pw.focus();
    },
    focusTriggered(index) {
      // console.log(index);
      // console.log('called' + index);
      // this[`inputRapper${index}Onfocus`] = true;
      this[`inputRapper${index}Onfocus`] = !this[`inputRapper${index}Onfocus`];
      // console.log(this.inputRapper1Onfocus);
      // console.log(this.inputRapper2Onfocus);
    },
    googleLoginRequest() {
      AccountService.requestGoogleLogin()
        .then((data) => {
          // console.log(data);
          if(data.mode === 'register') {
            this.processRegisteration = true;
            this.email = data.email;
            this.loginAttemptErrMsg = '';
            this.loginerror = true;
            this.errorMsg = 'You have to register first!'
          } else if(data.accountType == 'google') {
            this.loginerror = false;
            this.errorMsg = '';
            this.$store.dispatch("AccountModule/updateUserInfo",  {
              email: data.email,
              nickname: data.nickname,
              oid: data._id,
            });
            
            this.$router.push({name: "Home", query: { welcomeMsg: true }});
          } 
          else {  //TODO Handle unhandled case
            this.loginerror = true;
            this.errorMsg = 'Error occured. Please try again'
          }
        })
        .catch(() => {
          this.errorMsg = 'Error occured. Please try again';
          this.loginerror = true;
        })
      // this.processRegisteration = true;
    },
    goRegisteration() {
      this.$router.push({ name: "Register" });
    }
  },
  mounted() {
  },
  data() {
    return {
      // inputRapper1Onfocus: false,
      // inputRapper2Onfocus: false,
      user_id: '',
      user_pw: '',
      loginerror: false,
      errorMsg: '',
    };
  },
}
</script>
<style scoped>
.inputbox {
  text-align: center;
}
.buttonbox:hover {
  cursor: pointer;
  color: greenyellow;
}
*:focus {
  border: none;
  outline: none;
}
/* table { */
  /* border: 1px solid black; */
/* } */
/* th,td {
  padding: 0px 4px;
  border: 1px solid black;
} */
/* tr {
  border: 1px solid black;
} */
</style>