<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <router-view
  />
  <!-- <v-app id="dayspan" v-cloak>
    <ds-calendar-app :calendar="calendar"></ds-calendar-app>
  </v-app> -->
</template>

<script>
// import Memo from './components/Memo.vue'

export default {
  name: 'App',
  components: {
    // Memo
  },
  mounted() {
    // console.log('app.vue mounted');
    const filter = "hp-ux|linux i686|linux armv7l|mac68k|macppc|macintel|sunos|win16|win32|wince";
    console.log(navigator.platform);
    let isMobile;
    if (navigator.platform) isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
    this.$store.dispatch("AccountModule/updateMobile", isMobile);
    this.$store.dispatch("AccountModule/updateFocusDate", undefined);
    this.$store.dispatch("AccountModule/clearTodos");

    const googleLoginApi = document.createElement("script");
    googleLoginApi.setAttribute(
      "src",
      "https://apis.google.com/js/platform.js"
    );
    googleLoginApi.addEventListener("load", () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id:
            // "315991053717-jn2059hcfd4rirair5iadk7lsasn3rba.apps.googleusercontent.com",
            "514881335774-b310bt147k6kfv6m9lfc1h11295pnlcs.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
        });
      });
    });
    document.head.appendChild(googleLoginApi);
  },
}
</script>

<style>
/* @font-face {
  font-family: 'HiMelody-Regular';
  src: url(./assets/HiMelody-Regular.ttf) format('truetype'); 
} */
body {
  position: relative;
  /* min-height: 100vh; */
  min-width: 400px
  /* background-color: yellowgreen;  */
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* font-family: 'HiMelody-Regular'; */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d3748;
  background-color: #f5d4dc;
  font-weight: 500;
  font-size: 16px;
  /* background-image: url("assets/lined-note.jpg"); */
  /* background-image: url("assets/pinboard.jpg"); */
  /* background-repeat: repeat-y; */
  min-height: 100vh;
  /* background-size: contain; */
  /* background-size: 100vw 100vh; */
  user-select: none;
}
/* @media screen and (max-width: 400px) {
  #app {
    background-repeat: repeat;
  }
} */
button:hover {
  color: lightgreen;
}
*:focus {
  border: none;
  outline: none;
  user-select: none;
}
/* ::-webkit-scrollbar {
  width: 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  opacity: 0.1
}
::-webkit-scrollbar-button {
  display: none;
} */
/* ::-webkit-scrollbar-thumb {
  height: 2px;
  opacity: 0; */
  /* background-color: rgb(154, 235, 255); */
  /* background-color: rgba(0, 0, 0, 0.445);
  border-radius: 4px;
} */
</style>
