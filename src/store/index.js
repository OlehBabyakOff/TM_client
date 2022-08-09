import {createStore} from 'vuex'
import {postAuth, refreshService} from "@/api/auth";

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
      localStorage.setItem('token', res.data.user.accessToken);
      return res;
    },
    async signOut({commit}) {
      const res = await postAuth('logout');
      commit('setAuth', false);
      commit('setUser', null);
      localStorage.removeItem('token');
      return res;
    },
    async checkAuth({commit}) {
      try {
        const res = await refreshService('refresh');
        localStorage.setItem('token', res.data.accessToken);
        commit('setAuth', true);
        commit('setUser', res?.data?.user?.user);
      } catch (e) {
        localStorage.removeItem('token');
        commit('setAuth', false);
        commit('setUser', null);
      }
    }
  }
})
