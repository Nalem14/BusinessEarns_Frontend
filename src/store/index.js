import { createStore } from "vuex"
import User from './user'
import Axios from './axios'

const store = createStore({
  modules: {
    user: User,
    axios: Axios
  },
});

export default store