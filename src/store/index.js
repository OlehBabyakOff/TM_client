import {createStore} from 'vuex'
import {postAuth, refreshService} from "@/api/auth";

export default createStore({
  state: {
    isAuth: false,
    user: null,
    loaded: false
  },
  mutations: {
    setAuth(state, auth) {
      state.isAuth = auth;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoaded(state, loaded) {
      state.loaded = loaded;
    }
  },
  actions: {
    async signIn({commit}, data) {
      const res = await postAuth('login', data);
      commit('setAuth', true);
      commit('setUser', res?.data?.user?.user);
      commit('setLoaded', true);
      localStorage.setItem('token', res.data.user.accessToken);
      return res;
    },
    async signOut({commit}) {
      const res = await postAuth('logout');
      commit('setAuth', false);
      commit('setUser', null);
      commit('setLoaded', true)
      localStorage.removeItem('token');
      return res;
    },
    async checkAuth({commit}) {
      commit('setLoaded', false);
      try {
        const res = await refreshService('refresh');
        localStorage.setItem('token', res.data.accessToken);
        commit('setAuth', true);
        commit('setUser', res.data.user[0]);
      } catch (e) {
        localStorage.removeItem('token');
        commit('setAuth', false);
        commit('setUser', null);
      }
      commit('setLoaded', true);
    }
  }
})
