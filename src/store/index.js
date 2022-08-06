import { createStore } from 'vuex'
import {postAuth} from "@/api/auth";

export default createStore({
  state: {
    isAuth: false,
    user: null
  },
  mutations: {
    setAuth(state, auth) {
      state.isAuth = auth;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    signIn({commit}, data) {
      postAuth('login', data)
          .then(response => {
            commit('setAuth', true);
            commit('setUser', response?.data?.user?.user);
          })
    }
  }
})
