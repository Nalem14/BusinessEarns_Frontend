const User = {
  namespaced: true,

  state: () => ({
    _data: null,
    _token: null
  }),

  mutations: {
    setData(state, payload) {
      state._data = payload;
    },
    setToken(state, payload) {
      if (payload === null) localStorage.removeItem("AUTH_TOKEN");
      else localStorage.setItem("AUTH_TOKEN", payload);

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
        return rootGetters["axios/axios"].post("/auth/signup", data);
      } catch (error) {
        console.error(error);
      }
    },
    // Login request to account
    async login({ rootGetters, dispatch }, data) {
      try {
        // Send login request to API with email and password in data object
        return rootGetters["axios/axios"]
          .post("/auth/login", data)
          .then((response) => {
            // Authenticate with token received
            dispatch("authenticate", response.data.data.token);
          });
      } catch (error) {
        console.error(error);
      }
    },
    // Disconnect a user
    async logout({ commit }) {
      return new Promise((resolve) => {
        // Disconnect socketIO
        SocketioService.disconnect();

        // Empty user data and token
        commit("setData", null);
        commit("setToken", null);
        resolve();
      });
    },

    // Authenticate user with token
    async authenticate({ commit, dispatch }, token) {
      return new Promise((resolve, reject) => {
        // Save user token
        commit("setToken", token);

        // Init socket IO
        SocketioService.setupSocketConnection(token);

        // Set token on axios
        dispatch("axios/setAuthToken", token, { root: true }).then(() => {
          // Get user data
          dispatch("fetchData")
            .then((response) => {
              // Save user data
              commit("setData", response.data.data.user);
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
        return rootGetters["axios/axios"].get("/auth/read");
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
          commit("setData", response.data.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Update user
    async updateData({ rootGetters }, data) {
      try {
        // Update user data with new data specified
        return rootGetters["axios/axios"].put("/auth/update", data);
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
    hasToken(state) {
      if (!state._token) {
        const savedToken = localStorage.getItem("AUTH_TOKEN");
        if (savedToken) state._token = savedToken;
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
