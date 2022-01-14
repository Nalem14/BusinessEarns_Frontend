import AXIOS from 'axios';

const Axios = {
  namespaced: true,

  state: () => ({
    instance: null,
  }),
  getters: {
    axios(state) {
      if (state.instance !== null) return state.instance;

      const instance = AXIOS.create({
        baseURL: process.env.VUE_APP_BASE_API_URI,
        timeout: 5000,
      });

      state.instance = instance;
      return state.instance;
    },
  },
  mutations: {
    setAuthToken(state, payload) {
      state.instance.defaults.headers.common["Authorization"] =
        "Bearer " + payload;
    },
  },
  actions: {
    async setAuthToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        if (token !== null) {
          commit("setAuthToken", token);
          resolve();
        } else {
          reject();
        }
      });
    },
  },
};

export default Axios;
