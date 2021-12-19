<template>
  <div class=w-full>
    <div 
      class="relative w-full"
    >
      <div 
        id="topMenuBar"
        class="w-full flex justify-center pt-1"
      >
        <div v-if="showWelcomeMsg && userInfo" class="absolute left-5 hoverClass">
          Welcome! {{userInfo.nickname}}
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
    <router-view
    />
    <!-- absolute left-5 -->
    <div class="absolute w-full px-1/2 bottom-0 flex justify-around">
      <div class="hoverClass">
        <router-link to="/policy">Policy</router-link>
      </div>
      <div class="hoverClass">
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerMain',
  props: {
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
      showWelcomeMsg: true,
    }
  },
  mounted() {
    // console.log("memo")
    // this.showWelcomeMsg = this.$route.query.welcomeMsg;
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
  font-weight: 500;
  font-size: 16px;
}
</style>
