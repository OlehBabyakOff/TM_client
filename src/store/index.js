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
    async signIn({commit}, data) {
      const res = await postAuth('login', data);
      commit('setAuth', true);
      commit('setUser', res?.data?.user?.user);
      return res;
    },
    async signOut({commit}) {
      const res = await postAuth('logout');
      commit('setAuth', false);
      commit('setUser', null);
      return res;
    }
  }
})
