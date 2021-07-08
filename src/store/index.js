import { createStore } from "vuex";
import { auxiliares } from "./auxiliares.module";
// Auth Controllers
import AuthService from "../services/auth.service";

const initialState = JSON.parse(localStorage.getItem("user"));

export default createStore({
  namespaced: true,
  state: {
    loggedIn: initialState ? true : false,
    user: initialState ? initialState : null,
  },
  mutations: {
    loginSuccess(state, payload) {
      state.user = payload;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(payload));
    },

    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const usuarioLogin = await AuthService.login(user);
        commit("loginSuccess", usuarioLogin);
        return Promise.resolve(usuarioLogin);
      } catch (error) {
        console.error(`Error en el login: ${error}`);
        return Promise.reject(error);
      }
    },

    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
  },
  getters: {
    operador: (state) => {
      return state.user.username;
    },
    loggedIn: (state) => {
      return state.loggedIn;
    }
  },
  modules: {
    auxiliares
  },
});

