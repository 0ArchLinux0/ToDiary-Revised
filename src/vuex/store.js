// import Vue from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import AccountModule from "@/vuex/AccountStore.js";
// import StudioModule from "@/vuex/StudioStore.js";
// import ContentModule from "@/vuex/ContentStore.js";

// Vue.use(Vuex);

export default createStore({
  modules: {
    // StudioModule: StudioModule,
    AccountModule: AccountModule,
    // ContentModule: ContentModule,
  },
  plugins: [createPersistedState({ 
    paths: ["AccountModule"]
    //storage: window.sessionStorage, localStorage
   })],
});
