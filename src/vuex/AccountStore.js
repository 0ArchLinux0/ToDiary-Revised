// import AccountService from "../service/AccountService.js";

const AccountModule = {
  namespaced: true,
  state: {
    userInfo: undefined,
    userOid: undefined,
    currentPlayingContentIndex: 0,
  },
  mutations: {
    UPDATE_USERINFO(state, userInfo){
      state.userInfo = userInfo;
    },
  },
  getters: {
    userInfo: (state) => {
      return state.userInfo;
    },
    // currentReferer: (state) => {
    //   return state.referer;
    // },
  },
  actions: {
    updateUserInfo({ commit }, userInfo) {
      console.log('called');
      console.log(userInfo);
      commit("UPDATE_USERINFO", userInfo);
      // commit("UPDATE_USEROID", userInfo.oid);
    },
    clearUserInfo({ commit }) {
      commit("UPDATE_USERINFO", undefined);
    },
    // updateCurrentPlayingContentIndex({ commit }, index) {
    //   commit("WRITE_CONTENT_INDEX", index);

    //   console.log("to store " + index);
    // },
    // updateReferer({ commit }, referer) {
    //   commit("UPDATE_REFERER", referer);
    // },
  },
};

export default { ...AccountModule };
