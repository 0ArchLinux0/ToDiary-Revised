<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center items-center text-4xl "
      style="margin-bottom: 40vh"
    >
      Register
    </div>

    <div
      class="relative w-full border-2 border-black flex justify-center items-center"
      style="height:200px"
    >
      <transition name="fade">
        <div 
          v-if="mode==='loggedin'"
          class="absolute"
          key="loggedin"
        >
          You're already logged in.
        </div>
          <!-- v-else-if="hmm" -->
          <!-- style="width: 200px;height:200px;" -->
        <div
          v-if="mode==='register'"
          class="absolute bg-white"
          key="register"
        >
          Not ready
        </div>
        <div 
          v-if="mode==='error'"
          class="absolute"
          style="color:lightgreen;"
          key="error"
        > 
          Wrong password or not registered email
        </div>
        <div 
          v-if="mode==='login'"
          @click="googleLoginRequest" 
          class="absolute buttonbox bg-blue-300 px-2 rounded-lg text-2xl"
          key="login"
        > 
          <!-- style="top: 10%" -->
          Sign up with google 
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/AccountService.js"
export default {
  name: 'Register',
  props: {
    mobile: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    currentUser() {
      // return this.$store.getters["Accountmodule/currentUserInfo"];
      return 0;
    },
    mode() {
      if(this.currentUser) return 'loggedin';
      else if(this.processRegisteration) return 'login';
      else if(this.console.error) return 'error'
      else return 'login';
    }
  },
  methods: {
    moveFocus() {
      this.$refs.pw.focus();
    },
    focusTriggered(index) {
      this[`inputRapper${index}Onfocus`] = !this[`inputRapper${index}Onfocus`];
    },
    googleLoginRequest() {
      AccountService.requestGoogleLogin()
        .then((data) => {
          console.log('login success')
          if(data === 'register') {
            this.processRegisteration = true;
            this.change="!";
          } else if(data.email) {
            //login successed
            this.$route.push({name: 'Home'});
          }
        })
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
      change: '',
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>