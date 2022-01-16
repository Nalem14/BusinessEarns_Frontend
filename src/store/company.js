const Company = {
  namespaced: true,

  state: () => ({
    companies: [],
  }),
  getters: {
    // Do not use directly, call the action getCompany
    getCompany(state) {
      return function (id) {
        if (state.companies.length === 0) return null;

        const list = state.companies.filter((company) => company.id == id);
        if (list.length > 0) return list[0];

        return null;
      };
    },
  },
  mutations: {
    setCompanies(state, payload) {
      state.companies = payload;
    },
    deleteCompany(state, payload) {
        state.companies = state.companies.filter(e => e.id !== payload);
    }
  },
  actions: {
    /**
     * Companies
     */
    async createCompany({ rootGetters }, name) {
      return await rootGetters["axios/axios"].post("/companies", {
        name: name,
      });
    },
    async updateCompany({ rootGetters, dispatch }, { id, name, objective }) {
        const response = await rootGetters["axios/axios"].put(`/companies/${id}`, {
            name: name,
            objective: objective
        });
        dispatch("setCompany", response.data);
    },
    async deleteCompany({ rootGetters, commit }, id) {
        await rootGetters["axios/axios"].delete(`/companies/${id}`);
        commit("deleteCompany", id);
    },
    async fetchCompanies({ commit, rootGetters }) {
      const response = await rootGetters["axios/axios"].get("/companies");
      commit("setCompanies", response.data);
    },
    async fetchCompany({ rootGetters }, id) {
      return await rootGetters["axios/axios"].get("/companies/" + id);
    },
    async getCompany({ state, getters, dispatch, commit }, id) {
      let cached = getters.getCompany(id);
      if (cached !== null) return cached;

      const response = await dispatch("fetchCompany", id);
      let newList = [response.data, ...state.companies];
      commit("setCompanies", newList);

      return dispatch("getCompany", id);
    },
    setCompany({ state, commit }, newCompany) {
      let list = state.companies.map((company) => {
        if (company.id === id) {
          return newCompany;
        }

        return company;
      });

      commit("setCompanies", list);
    },

    /**
     * Earns
     */
    async createEarn({ rootGetters }, { companyId, amount }) {
      const response = await rootGetters["axios/axios"].post(
        `/companies/${companyId}/earns`,
        {
          amount: amount,
        }
      );

      return response;
    },
    async updateEarn({ rootGetters }, { companyId, earnId, amount }) {
      const response = await rootGetters["axios/axios"].put(
        `/companies/${companyId}/earns/${earnId}`,
        {
          amount: amount,
        }
      );

      return response;
    },
    async deleteEarn({ rootGetters }, { companyId, earnId }) {
      const response = await rootGetters["axios/axios"].delete(
        `/companies/${companyId}/earns/${earnId}`
      );
      return response;
    },
    async fetchEarns({ rootGetters }, companyId) {
      const response = await rootGetters["axios/axios"].get(
        `/companies/${companyId}/earns`
      );
      return response.data;
    },
  },
};

export default Company;
