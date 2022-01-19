import AXIOS from 'axios';

const Axios = {
  namespaced: true,

  state: () => ({
    instance: null,
  }),
  getters: {
    axios(state) {
      if (state.instance !== null) return state.instance;

      let url = "/api";
      if(process.env.NODE_ENV === "production")
        url = "https://oneill.orion-serv.fr:44094";

      const instance = AXIOS.create({
        baseURL: url,
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
