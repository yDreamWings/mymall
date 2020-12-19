import {
  ADD_MERCHANDISE_COUNT,
  PUSH_MERCHANDISE
} from './store_type'

export default {
  addToCar(context, merchandise) {
    return new Promise((resolve, reject)=>{
      let isOldMerchandise = context.state.shopCar.find(shopCarGoods => shopCarGoods.iid === merchandise.iid);
      if(isOldMerchandise){
        context.commit(ADD_MERCHANDISE_COUNT, isOldMerchandise);
        resolve('商品+1')
      }else{
        merchandise.count = 1;
        merchandise.isCheck = false;
        context.commit(PUSH_MERCHANDISE, merchandise);
        resolve('添加购物车成功！')
      }
    })
  }
}