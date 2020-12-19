import {
  ADD_MERCHANDISE_COUNT,
  PUSH_MERCHANDISE
} from './store_type'

export default {
  [ADD_MERCHANDISE_COUNT](state, merchandise){
    merchandise.count++;
    },
    
  [PUSH_MERCHANDISE](state, merchandise){
    state.shopCar.push(merchandise);
  }
}