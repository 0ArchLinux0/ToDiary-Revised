<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center items-center text-4xl"
      style="margin-bottom: 25vh"
    >
    <!-- bg-blue-300 px-2 -->
      Register
    </div>
<!-- border-2 border-black -->
    <div
      class="relative w-full flex flex-col text-xl justify-start items-center"
      style="height:200px"
    >
      <!-- <transition appear name="fade">
        
      </transition> --> 
      <transition name="fade" mode="out-in">
        <div 
          v-if="mode==='loggedin'"
          key="loggedin"
        >
          You're already logged in.
          <!-- class="absolute" -->
        </div>
        <div
          v-else-if="mode==='register'"
          class="w-full"
          key="register"
        >
          Not ready
          <PostIt 
            ref="postit"
            :initial="true"
            body="Your Nickname"
            :preventDefault="true"
            :maxInput="13"
            buttonName="submit"
            :textConfirmed="textConfirmed"
            @textchanged="textConfirmed=false;canUseNickname=false;nicknameCheckResult=''"
            @getBody="getBody"
          />
          <button v-if='canUseNickname && textConfirmed'
            @click="submit"
          >
            submit
          </button>
          <button v-else
            @click="check"
          >
            check
          </button>
          <div
            :style="{'color': canUseNickname ? 'green' : 'red'}"
          >
            {{nicknameCheckResult}}
          </div>
          <!-- class="absolute bg-white" -->
        </div>
        <button 
          v-else-if="mode==='login'"
          class="bg-blue-200 rounded-lg px-2"
          @click="googleLoginRequest" 
          key="login"
        > 
          Sign up with google 
          <!-- class="absolute buttonbox bg-blue-300 px-2 rounded-lg text-2xl" -->
        </button>
      </transition>
        <div 
          style="color: red;"
          key="error"
        > 
          <!-- class="absolute" -->
          {{ loginAttemptErrMsg }}
        </div>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/AccountService.js"
import PostIt from '../components/PostIt.vue'
// import { bus } from '../main'
export default {
  name: 'Register',
  components: {
    PostIt,
  },
  props: {
    // mobile: {
    //   type: Boolean,
    //   default: true,
    // }
  },
  computed: {
    currentUser() {
      // return this.$store.getters["Accountmodule/currentUserInfo"];
      return 0;
    },
    mode() {
      if(this.currentUser) return 'loggedin';
      else if(this.processRegisteration) {
        // console.log('mode is register!!!!!!!!')
        return 'register';
      }
      else if(this.error) return 'error'
      else return 'login';
    }
  },
  methods: {
    moveFocus() {
      this.$refs.pw.focus();
    },
    a() {
      this.processRegisteration =false;
      // console.log('clicked')
    },
    check() {
      const nickname = this.$refs.postit.newMemo;
      AccountService.exists({ nickname })
      .then(({ data }) => { 
        console.log(data)
        if(data==1) {
          this.nicknameCheckResult = 'This nickname is already taken';
          this.textConfirmed = true;
          this.canUseNickname = false;
        } else {
          this.textConfirmed = true; 
          this.canUseNickname = true;
          this.nicknameCheckResult = "You can use " + nickname;
        }
      })
      .catch(() => {
        this.nicknameCheckResult = 'Error occured! Try again';
          this.textConfirmed = true;
          this.canUseNickname = false;
      });
    },
    submit() {
      const nickname = this.$refs.postit.newMemo;
      AccountService.register(
        { 
          nickname: nickname,
          email: this.email,
          accountType: 'google',
        })
        .then(({ data }) => {
          // console.log(data);
          this.$router.push({ name:'Home', params: { pushedAfter: 'registered' } }) 
          this.$store.dispatch("AccountModule/updateUserInfo",  {
            email: this.email,
            nickname,
            oid: data,
          });
        })
        .catch(() => {
          this.errMsg = "Failed to register. Try agin";
          this.textConfirmed = false;
          this.canUseNickname = false;
        });
    },
    getBody() {
      this.$refs.postit.getBody();
    },
    focusTriggered(index) {
      this[`inputRapper${index}Onfocus`] = !this[`inputRapper${index}Onfocus`];
    },
    googleLoginRequest() {
      AccountService.requestGoogleLogin()
        .then((data) => {
          console.log('login success')
          if(data.mode === 'register') {
            this.processRegisteration = true;
            this.email = data.email;
            this.loginAttemptErrMsg = '';
          } else if(data.accountType == 'google') {
            this.processRegisteration = false;
            this.loginAttemptErrMsg = `You're already registered`;  
            // Wrong password or not registered email
            // this.$route.push({name: 'Home'});
            //TODO: handle error case when account type is different
          } else {
            this.processRegisteration = false;
            this.error = false;
          }
        })
        .catch(() => {
          // console.log(e);
          // if(e == 'closed') {
          //   // this.error
          // }
          this.error = false;
          this.processRegisteration = false;
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
      inputRapper1Onfocus: false,
      inputRapper2Onfocus: false,
      user_id: '',
      user_pw: '',
      loginerror: false,
      processRegisteration: false,
      hmm: true,
      error: false,
      canUseNickname: false,
      nicknameCheckResult: '',
      textConfirmed: false,
      email: undefined,
      loginAttemptErrMsg: '',
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
table {
  width: 100%;
  font-size: 30px;
  border: 1px solid black;
  border-collapse: collapse;
}
th,td {
  padding: 0px 4px;
  border: 1px solid black;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
/* .slide-fade-leave-active below version 2.1.8 */
/* {
  transform: translateX(-50px);
  opacity: 0;
} */
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
*:focus {
  outline: none;
  border: none;
}
</style>