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
body {
  position: relative;
  /* min-height: 100vh; */
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
  /* background-color: #fdeec6; */
  background-image: url("assets/lined-note.jpg");
  /* background-image: url("assets/pinboard.jpg"); */
  background-repeat: repeat-y;
  min-height: 100vh;
  /* background-size: contain; */
  background-size: 100vw 100vh;
  user-select: none;
}
*:focus {
  border: none;
  outline: none;
  user-select: none;
}
::-webkit-scrollbar {
  width: 10px;
  /* height: 9px; */
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  opacity: 0.1
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-thumb {
  /* overflow: overlay; */
  height: 2px;
  opacity: 0;
  /* background-color: rgb(154, 235, 255); */
  background-color: rgba(0, 0, 0, 0.445);
  border-radius: 4px;
}
</style>
