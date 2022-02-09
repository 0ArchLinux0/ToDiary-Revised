// import AccountService from "../service/AccountService.js";

const AccountModule = {
  namespaced: true,
  state: {
    userInfo: undefined,
    // userInfo: {
    //   email: 'bluebluerize900@gmail.com',
    //   nickname: 'Admin',
    //   oid: '60a4c9f8708c73536cb73f49',
    // },
    mobile: false,
    // oid, nickname, email
    userOid: undefined,
    todoLists: {},
    currentPlayingContentIndex: 0,
    focusDate: undefined,
  },
  mutations: {
    UPDATE_USERINFO(state, userInfo){
      state.userInfo = userInfo;
    },
    UPDATE_MOBILE(state, isMobile) {
      state.mobile = isMobile;
    },
    UPDATE_TODOS(state, todoObj) {
      const { year, month, todos } = todoObj;
      console.log('vuex' + month);
      console.log(todos);
      if(!state.todoLists[year]) state.todoLists[year] = {};
      state.todoLists[year][month] = todos;
    },
    CLEAR_TODOS(state) {
      state.todoLists = {};
    },
    UPDATE_FOCUSDATE(state, focusDate) {
      state.focusDate = focusDate;
    },
  },
  getters: {
    userInfo: (state) => {
      return state.userInfo;
    },
    mobile: (state) => {
      return state.mobile;
    },
    todos: (state) => {
      return state.todoLists;
    },
    focusDate: (state) => {
      return state.focusDate;
    }
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
    },
    storeTodos({ commit }, todoObj) {
      commit("UPDATE_TODOS", todoObj);
    },
    clearTodos({ commit }) {
      commit("CLEAR_TODOS");
    },
    updateFocusDate({ commit }, focusDate) {
      commit("UPDATE_FOCUSDATE", focusDate);
      console.log(focusDate);
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
