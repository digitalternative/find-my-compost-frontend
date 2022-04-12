import { createStore } from "vuex";
import { USER_INFO, COMPOSTS, MY_COMPOSTS } from "@/graphql/queries";
import { CREATE_USER, CREATE_COMPOST } from "@/graphql/mutations";
import { apolloClient } from "../apollo.provider";
import { version } from "../../package.json";

export default createStore({
  state: {
    // Cache version
    version: "",
    token: "",
    user: {},
    authStatus: false,
    composts: [],
  },

  getters: {
    authStatus: (state) => state.authStatus,
    user: (state) => state.user,
    compostsList: (state) => {
      let compostList = [];

      if (Object.keys(state.composts).length > 0) {
        const data = Object.values(state.composts);
        compostList = data.map(function (value) {
          return {
            title: value.title,
            subtitle: value.address.city,
            type: value.type,
            icon: "mdi-map-marker-circle",
            color:
              value.type == "public"
                ? "green darken-2"
                : value[0].type == "private"
                ? "blue darken-2"
                : "blue-grey darken-2",
          };
        });
      }
      return compostList;
    },
  },

  mutations: {
    setComposts(state, data) {
      state.composts = data;
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
    async getComposts({ commit }) {
      const { data } = await apolloClient.query({
        query: COMPOSTS,
        fetchPolicy: "no-cache",
      });
      commit("setComposts", data.composts);
      return data.composts;
    },

    async getMyComposts({ commit }) {
      const { data } = await apolloClient.query({
        query: MY_COMPOSTS,
        fetchPolicy: "no-cache",
      });
      commit("setComposts", data.myComposts);
      return data.myComposts;
    },

    async addCompost({ dispatch }, addressInput) {
      const res = await apolloClient.mutate({
        mutation: CREATE_COMPOST,
        variables: { ...addressInput },
      });
      return res;
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
          return await res.data.createUser.email;
        }
      }
    },

    async signIn({ commit }, authDetails) {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authDetails),
      });

      const json = await res.json();
      if (json.access_token) {
        if (authDetails.username) {
          const { data } = await apolloClient.query({
            query: USER_INFO,
            variables: { email: authDetails.username },
          });
          commit("setStore", { token: json.access_token, ...data });
          await apolloClient.resetStore();
        }
      } else {
        throw "Email ou mot de passe incorrect !";
      }
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
