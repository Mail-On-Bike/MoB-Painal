import { createStore } from "vuex";
import { auxiliares } from "./auxiliares.module";
// Auth Controllers
import AuthService from "../services/auth.service";

if (
  localStorage.getItem("user_mob_painal") &&
  !localStorage.getItem("user_mob_painal").startsWith("{")
)
  localStorage.clear();

const initialState = JSON.parse(localStorage.getItem("user_mob_painal"));

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
      localStorage.setItem("user_mob_painal", JSON.stringify(payload));
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
        if (usuarioLogin != undefined) {
          commit("loginSuccess", usuarioLogin);
          return Promise.resolve(usuarioLogin);
        } else {
          console.log("Error en el login");
        }
      } catch (error) {
        console.error(`Error en el login: ${error}`);
        return Promise.reject(error);
      }
    },

    updateProfile({ commit }, user) {
      try {
        commit("loginSuccess", user);
        return Promise.resolve(user);
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
    },
    clienteData: (state) => {
      return state.user.clienteAsignado;
    },
  },
  modules: {
    auxiliares,
  },
});
