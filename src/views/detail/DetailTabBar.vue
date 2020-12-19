<template>
  <div class="detail-tabbar">
    <div class="w15 fontSize">
      <div class="img">
        <img :src="CustomerService">
      </div>
      <div class="content">客服</div>
    </div>
    <div class="w15 fontSize">
      <div class="img">
        <img :src="Shop">
      </div>
      <div class="content">店铺</div>
    </div>
    <div class="w15 fontSize">
      <div class="img">
        <img :src="Collection">
      </div>
      <div class="content">收藏</div>
    </div>
    <div class="w30 bColorYellow lineHeight" @click="addToShopCar">加入购物车</div>
    <div class="w25 bColorPink lineHeight">购买</div>
  </div>
</template>

<script>
import CustomerService from 'assets/svg/detail/CustomerService.png'
import Shop from 'assets/svg/detail/Shop.png'
import Collection from 'assets/svg/detail/Collection.png'
export default {
  data(){
    return {
      CustomerService,
      Shop,
      Collection
    }
  },
  methods : {
    addToShopCar(){
      this.$emit('addToShopCar');
    }
  }
}
</script>

<style scoped>
.detail-tabbar{
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 9;
  height: 49px;
  width: 100%;
  background-color: #fff;
}
.detail-tabbar div{
  text-align: center;
}
.w15{
  width: 15%;
}
.w30{
  width: 30%;
}
.w25{
  width: 25%;
}
.fontSize{
  font-size: 15px;
}
.bColorYellow{
  background-color: yellow;
}
.bColorPink{
  background-color: deeppink;
  color: #fff;
}
.img{
  height: 24px;
  margin-top: 5px;
}
img{
  height: 20px;
}
.content{
  height: 16px;
}
.lineHeight{
  line-height: 49px;
}
</style>