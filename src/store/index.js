import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

const state = {
  shopCar : [],
}

export default createStore({
  state,
  mutations,
  actions,
  modules: {
  }
})
