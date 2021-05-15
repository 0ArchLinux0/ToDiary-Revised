<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center items-center text-4xl "
      style="margin-bottom: 40%"
    >
      Register
    </div>


    <div 
      v-if="currentUser"
    >
      You're already logged in.
    </div>

    <div
      v-else-if="processRegisteration"
    >
      Not ready
    </div>
    
    <div v-else
      @click="googleLoginRequest" 
      class="buttonbox bg-blue-300 px-2 rounded-lg text-2xl"
      style="top: 10%"
    > 
      Sign up with google 
    </div>
    <div 
      v-if="loginerror" 
      style="color:lightgreen;"
    > 
      Wrong password or not registered email
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
</style>