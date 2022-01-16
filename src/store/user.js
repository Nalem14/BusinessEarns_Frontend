import { Storage } from "@capacitor/storage";

const User = {
  namespaced: true,

  state: () => ({
    _data: null,
    _token: null,
  }),

  mutations: {
    setData(state, payload) {
      state._data = payload;
    },
    setToken(state, payload) {
      if (payload === null) {
        Storage.remove({ key: "AUTH_TOKEN" });
      } else {
        Storage.set({
          key: "AUTH_TOKEN",
          value: payload,
        });
      }

      state._token = payload;
    },
    setSearchList(state, payload) {
      state._searchList = payload;
    },
  },

  actions: {
    // Create account
    async create({ rootGetters }, data) {
      try {
        return rootGetters["axios/axios"].post("/users", data);
      } catch (error) {
        console.error(error);
      }
    },
    // Login request to account
    async login({ rootGetters, dispatch }, data) {
      // Send login request to API with email and password in data object
      return rootGetters["axios/axios"]
        .post("/users/auth/login/", data)
        .then((response) => {
          console.log(response)
          // Authenticate with token received
          dispatch("authenticate", response.data.access_token);
        });
    },
    // Disconnect a user
    async logout({ commit }) {
      return new Promise((resolve) => {
        // Empty user data and token
        commit("setData", null);
        commit("setToken", null);
        resolve();
      });
    },

    // Authenticate user with token
    async authenticate({ rootGetters, commit, dispatch }, token) {
      return new Promise((resolve, reject) => {
        // Save user token
        commit("setToken", token);

        // Init axios instance
        rootGetters["axios/axios"];

        // Set token on axios
        dispatch("axios/setAuthToken", token, { root: true }).then(() => {
          // Get user data
          dispatch("fetchData")
            .then((response) => {
              // Save user data
              commit("setData", response.data);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },

    // Fetch user data
    async fetchData({ rootGetters }) {
      try {
        // Get user data on API
        return rootGetters["axios/axios"].get("/users/profile");
      } catch (error) {
        console.error(error);
      }
    },
    // Fetch and Set user data
    async fetchSetData({ dispatch, commit }) {
      // Get user data on API
      return dispatch("fetchData")
        .then((response) => {
          // Set user data
          commit("setData", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Update user
    async updateData({ rootGetters, getters }, data) {
      try {
        // Update user data with new data specified
        return rootGetters["axios/axios"].put(
          "/users/" + getters.user.id,
          data
        );
      } catch (error) {
        console.error(error);
      }
    },
  },

  getters: {
    isAuthenticated(state) {
      return state._token !== null && state._data !== null;
    },
    isSuperAdmin(state, getters) {
      return getters.isAuthenticated && state._data.isAdmin === true;
    },
    // Check has token saved in local storage or in state
    async hasToken(state) {
      if (state._token === null) {
        const savedToken = await Storage.get({ key: "AUTH_TOKEN" });
        if (savedToken.value) state._token = savedToken.value;
      }

      return state._token !== null;
    },
    // Return current user data in state
    user(state) {
      return state._data !== null ? state._data : false;
    },
  },
};

export default User;
