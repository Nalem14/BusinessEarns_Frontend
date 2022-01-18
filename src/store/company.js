import { moment } from "../mixins/Helper.mixin";

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
    earnByDate() {
      return function (from, to, arrayEarns, returnArray = false) {
        if (arrayEarns.length <= 0) return 0;

        let amount = 0;

        let list = arrayEarns.filter(
          (earn) =>
            moment(earn.createdAt).isBefore(to) &&
            moment(earn.createdAt).isAfter(from)
        );

        if (returnArray) return list;

        for (let i = 0; i < list.length; i++) {
          const earn = list[i];
          amount += earn.amount;
        }

        return amount;
      };
    },
    earnThisMonth(state, getters) {
      return function (arrayEarns, returnArray = false) {
        return getters.earnByDate(
          moment().startOf("month"),
          moment().endOf("month"),
          arrayEarns,
          returnArray
        );
      };
    },
    earnLastMonth(state, getters) {
      return function (arrayEarns, returnArray = false) {
        return getters.earnByDate(
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
          arrayEarns,
          returnArray
        );
      };
    },
  },
  mutations: {
    setCompanies(state, payload) {
      state.companies = payload;
    },
    deleteCompany(state, payload) {
      state.companies = state.companies.filter((e) => e.id !== payload);
    },
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
      const response = await rootGetters["axios/axios"].put(
        `/companies/${id}`,
        {
          name: name,
          objective: objective,
        }
      );
      dispatch("setCompany", response.data);
    },
    async deleteCompany({ rootGetters, commit }, id) {
      await rootGetters["axios/axios"].delete(`/companies/${id}`);
      commit("deleteCompany", id);
    },
    async fetchCompanies({ commit, rootGetters }) {
      return new Promise(async (resolve) => {
        const response = await rootGetters["axios/axios"].get("/companies");
        commit("setCompanies", response.data);
        resolve();
      });
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
