import { createStore } from "vuex";
import User from "./user";
import Axios from "./axios";
import Company from "./company";

const store = createStore({
  modules: {
    user: User,
    axios: Axios,
    company: Company
  },
});

export default store;
