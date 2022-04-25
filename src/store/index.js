import { createStore } from "vuex";
import {
  USER_INFO,
  COMPOSTS,
  MY_COMPOSTS,
  CHECK_PASSWORD,
} from "@/graphql/queries";
import {
  CREATE_USER,
  REMOVE_USER,
  UPDATE_USER,
  CREATE_COMPOST,
  REMOVE_COMPOST,
  UPDATE_COMPOST,
} from "@/graphql/mutations";
import { apolloClient } from "../apollo.provider";
import { version } from "../../package.json";
import compostsMap from "../graphql/compostsMap";

export default createStore({
  state: {
    // Cache version
    version: "",
    token: "",
    user: {},
    authStatus: false,
    composts: [],
    compostType: compostsMap.TYPE,
    compostTypeColortoto: {
      public: "primary-darken-1",
      private: "secondary-darken-1",
    },
  },

  getters: {
    authStatus: (state) => state.authStatus,
    user: (state) => state.user,
    compostById: (state) => (id) => {
      return state.composts.filter((compost) => compost._id === id._id)[0];
    },
    composts: (state) => state.composts,
    compostTypeName: (state) => (type) => {
      return state.compostType[type];
    },
    compostType: (state) => (name) => {
      return Object.keys(state.compostType).find(
        (key) => state.compostType[key] === name
      );
    },
    compostTypeColor: (state) => (type) => {
      return state.compostTypeColortoto[type];
    },
    compostFavoriteColor: (state) => (id) => {
      return state.user.favorites.filter((favorite) => {
        return favorite === id;
      })[0]
        ? "#f44336"
        : "default";
    },
    days: () => {
      return [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ];
    },
  },

  mutations: {
    setComposts(state, data) {
      state.composts = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    setStore(state, data) {
      state.authStatus = true;
      state.user = { ...data.user };
      state.token = data.token;
    },
    unSetStore(state) {
      state.authStatus = false;
      state.token = "";
      state.user = {};
      state = false;
    },
    initialiseStorage(state) {
      // Check if the store exists
      if (localStorage.getItem("store")) {
        let store = JSON.parse(localStorage.getItem("store"));
        // Check the version stored against current. If different, don't
        // load the cached version
        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
      }
    },
  },

  actions: {
    async getAllComposts({ commit }) {
      const { data } = await apolloClient.query({
        query: COMPOSTS,
        fetchPolicy: "no-cache",
      });
      if (data.composts) {
        commit("setComposts", data.composts);
        await apolloClient.resetStore();
      }
      return await data.composts;
    },

    async getFavoritesComposts({ commit, state }) {
      const { data } = await apolloClient.query({
        query: COMPOSTS,
        fetchPolicy: "no-cache",
      });

      if (data.composts) {
        const composts = data.composts;
        const favoritesComposts = composts.filter((compost) =>
          state.user.favorites.includes(compost._id)
        );
        commit("setComposts", favoritesComposts);
        await apolloClient.resetStore();
        return await favoritesComposts;
      }
    },

    async getMyComposts({ commit }) {
      const { data } = await apolloClient.query({
        query: MY_COMPOSTS,
        fetchPolicy: "no-cache",
      });
      if (data.myComposts) {
        commit("setComposts", data.myComposts);
        await apolloClient.resetStore();
        return await data.myComposts;
      }
    },

    async getUserInfo({ commit }, email) {
      const { data } = await apolloClient.query({
        query: USER_INFO,
        variables: { email: email },
      });
      if (data.user) {
        commit("setUser", data.user);
        await apolloClient.resetStore();
        return await data.user;
      }
    },

    async addCompost({ dispatch }, compostInput) {
      const res = await apolloClient.mutate({
        mutation: CREATE_COMPOST,
        variables: compostInput,
      });
      if (res.data.createCompost.title) {
        await dispatch("getMyComposts");
        return await res.data.createCompost.title;
      }
    },
    async removeCompost({ dispatch }, _id) {
      const res = await apolloClient.mutate({
        mutation: REMOVE_COMPOST,
        variables: { _id: _id },
      });
      if (res.data.removeCompost.title) {
        await dispatch("getMyComposts");
        return await res.data.removeCompost.title;
      }
    },
    async removeUserCompost() {
      const { data } = await apolloClient.query({
        query: MY_COMPOSTS,
        fetchPolicy: "no-cache",
      });
      if (data.myComposts) {
        let promises = [];
        data.myComposts.forEach((compost) => {
          promises.push(
            new Promise((resolve, reject) => {
              apolloClient
                .mutate({
                  mutation: REMOVE_COMPOST,
                  variables: { _id: compost._id },
                })
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => reject(err));
            })
          );
        });
        return await Promise.all(promises);
      }
    },
    async updateCompost({ dispatch }, compostInput) {
      const res = await apolloClient.mutate({
        mutation: UPDATE_COMPOST,
        variables: compostInput,
      });
      if (res.data.updateCompost.title) {
        await dispatch("getMyComposts");
        return await res.data.updateCompost.title;
      }
    },
    async updateFavorite({ dispatch, state }, data) {
      let favorites = [...state.user.favorites];
      const toRemove = favorites.includes(data._id);

      if (toRemove) {
        favorites = favorites.filter((favorite) => {
          return favorite !== data._id;
        });
      } else {
        favorites.push(data._id);
      }
      await dispatch("updateUser", {
        _id: state.user._id,
        favorites: favorites,
      });
      if (data.filter === "fav" && toRemove) {
        await dispatch("getFavoritesComposts");
      }
      return await toRemove;
    },
    async updateUser({ dispatch }, userInput) {
      const res = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: userInput,
      });
      if (res.data.updateUser) {
        await dispatch("getUserInfo", res.data.updateUser.email);
        return await res.data.updateUser.email;
      }
    },
    async checkPassword({ dispatch }, password) {
      const res = await apolloClient.query({
        query: CHECK_PASSWORD,
        variables: password,
      });
      if (res.data.checkPassword) {
        return await res.data.checkPassword;
      }
    },
    async removeUser({ dispatch }, email) {
      const res = await apolloClient.mutate({
        mutation: REMOVE_USER,
        variables: { email: email },
      });
      if (res.data.removeUser.email) {
        await dispatch("signOut");
        return res.data.removeUser.email;
      }
    },
    async signUp({ dispatch }, authDetails) {
      const res = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { role: ["user"], ...authDetails },
      });

      if (res.data.createUser.email) {
        {
          await dispatch("signIn", {
            username: authDetails.email,
            password: authDetails.password,
          });
          apolloClient.resetStore();
          return await res.data.createUser.email;
        }
      }
    },

    async signIn({ dispatch }, authDetails) {
      let url = import.meta.env.VITE_BACKEND_URI + "/login";
      if (authDetails.social) {
        url = url + "/" + authDetails.social;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authDetails),
      });
      const data = await res.json();
      if (data.access_token) {
        if (data.email) {
          await dispatch("setStoreInfo", data);
          return data.email;
        }
      } else {
        throw "Email ou mot de passe incorrect !";
      }
    },
    async setStoreInfo({ commit, dispatch }, data) {
      const userInfo = await dispatch("getUserInfo", data.email);
      commit("setStore", { token: data.access_token, user: userInfo });
      await apolloClient.resetStore();
      return true;
    },
    async signOut({ commit }) {
      commit("unSetStore");
      await apolloClient.resetStore();
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
  },

  modules: {},
});
