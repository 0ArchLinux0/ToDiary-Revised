<template>
  <div class=w-full>
    <div 
      class="relative w-full"
    >
      <div 
        id="topMenuBar"
        class="w-full flex justify-center text-xl bg-yellow-3 pt-1"
      >
        <div class="absolute left-5 hoverClass">
          <router-link to="/contact">Contact</router-link>
          <!-- <router-link to="/policy">Policy</router-link> -->
        </div>
        <div class="hoverClass">
          <router-link to="/">Home</router-link>
        </div>
        <div 
          v-if="userInfo" 
          class="flex flex-col justify-start items-end absolute right-5 z-20"
          @mouseenter="mypageHover=true"
          @mouseleave="mypageHover=false"
        >
          <button>
            <router-link to="/mypage">My page</router-link>
          </button>
          <button 
            v-show="mypageHover"
            @click="logout"
          >
            Logout
            <!-- <router-link to="/mypage">Logout</router-link> -->
          </button>
        </div>
        <div v-else class="absolute right-5 hoverClass">
          <router-link to="/login">Login</router-link>
        </div>
        <!-- <button class="absolute left-5" @click="navigate('Contact')">Contact</button> -->
        <!-- <button @click="navigate('Home')">Home</button> -->
        <!-- <button class="absolute right-5" @click="navigate('Login')">Login</button> -->
      </div>
        <!-- :mobile="mobile" -->
    </div>
    <div v-if="showWelcomeMsg && userInfo" class="relative w-full bg-white">
      <div class="absolute left-5 text-xl">
        Welcome! {{userInfo.nickname}}
      </div>
    </div> 
    <router-view
    />
    <!-- absolute left-5 -->
    <div class="absolute w-full bottom-0 hoverClass text-xl">
      <!-- <router-link to="/contact">Contact</router-link> -->
      <router-link to="/policy">Policy</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerMain',
  props: {
    // msg: String
  },
  computed: {
    userInfo() {
      return this.$store.getters["AccountModule/userInfo"];
    }
  },
  methods: {
    navigate(name) {
      this.$router.push({ name: `${name}` });
    },
    logout() {
      this.$store.dispatch("AccountModule/clearUserInfo");
      this.$router.go(0);
    }
  },
  data() {
    return {
      mypageHover: false,
      showWelcomeMsg: false,
    }
  },
  mounted() {
    // console.log("memo")
    this.showWelcomeMsg = this.$route.query.welcomeMsg;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hoverClass:hover {
  color: lightgreen;
}
button {
  border: none;
  outline: none;
  user-select: none;
}
</style>
