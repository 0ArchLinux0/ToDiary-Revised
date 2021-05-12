<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <router-view
    :mobile="mobile"
  />
</template>

<script>
// import Memo from './components/Memo.vue'

export default {
  name: 'App',
  components: {
    // Memo
  },
  data() {
    return {
      mobile: false,
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'HiMelody-Regular';
  src: url(./assets/HiMelody-Regular.ttf) format('truetype'); 
}
body, #app {
  position: relative;
  height: 100vh;
  min-width: 400px
  /* background-color: yellowgreen;  */
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'HiMelody-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FBF7EE;
  height: 100%;
}
*:focus {
  border: none;
  outline: none;
  user-select: none;
}
</style>
