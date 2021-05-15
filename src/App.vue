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
  mounted() {
    const googleLoginApi = document.createElement("script");
    googleLoginApi.setAttribute(
      "src",
      "https://apis.google.com/js/platform.js"
    );
    googleLoginApi.addEventListener("load", () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id:
            "315991053717-jn2059hcfd4rirair5iadk7lsasn3rba.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
        });
      });
    });
    document.head.appendChild(googleLoginApi);
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
  /* background-color: #FBF7EE; */
  background-image: url("assets/lined-note.jpg");
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-size: 100% 100%;
  height: 100%;
  user-select: none;
}
*:focus {
  border: none;
  outline: none;
  user-select: none;
}
</style>
