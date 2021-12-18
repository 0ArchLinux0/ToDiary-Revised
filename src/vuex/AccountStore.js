// import AccountService from "../service/AccountService.js";

const AccountModule = {
  namespaced: true,
  state: {
    // userInfo: undefined,
    // userInfo: {
    //   email: 'bluebluerize900@gmail.com',
    //   nickname: 'Admin',
    //   oid: '60a4c9f8708c73536cb73f49',
    // },
    mobile: false,
    // oid, nickname, email
    userOid: undefined,
    currentPlayingContentIndex: 0,
  },
  mutations: {
    UPDATE_USERINFO(state, userInfo){
      state.userInfo = userInfo;
    },
    UPDATE_MOBILE(state,isMobile) {
      state.mobile = isMobile;
    }
  },
  getters: {
    userInfo: (state) => {
      return state.userInfo;
    },
    mobile: (state) => {
      return state.mobile;
    },
    // currentReferer: (state) => {
    //   return state.referer;
    // },
  },
  actions: {
    updateUserInfo({ commit }, userInfo) {
      // console.log('called');
      // console.log(userInfo);
      commit("UPDATE_USERINFO", userInfo);
      // commit("UPDATE_USEROID", userInfo.oid);
    },
    clearUserInfo({ commit }) {
      commit("UPDATE_USERINFO", undefined);
    },
    updateMobile({ commit }, isMobile) {
      commit("UPDATE_MOBILE", isMobile);
    }
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
