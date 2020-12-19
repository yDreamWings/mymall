<template>
  <div class="detail-shop">
    <!-- 店铺logo -->
    <div class="shop-logo">
      <img :src="shopInfo.logo">
      <span>{{shopInfo.name}}</span>
    </div>
    <!-- 店铺信息 -->
    <div class="shop-content">
      <DetailShopDesItem :shopItem="[sellsItem, '总销量']"></DetailShopDesItem>
      <DetailShopDesItem :shopItem="[goodsCountItem, '全部宝贝']"></DetailShopDesItem>
      <!-- 店铺评分 -->
      <div class="score" v-if="shopInfo.score">
        <!-- 描述相符 -->
        <div>
          <span class="score-desc">{{shopScore(shopInfo.score[0])}}</span>
          <span :class="[isBetterColor(0)?'colorRed':'colorGreen','font']">{{isBetter(0)}}</span>
        </div>
        <!-- 价格合理 -->
        <div>
          <span  class="score-desc">{{shopScore(shopInfo.score[1])}}</span>
          <span :class="[isBetterColor(1)?'colorRed':'colorGreen','font']">{{isBetter(1)}}</span>
        </div>
        <!-- 质量满意 -->
        <div>
          <span  class="score-desc">{{shopScore(shopInfo.score[2])}}</span>
          <span :class="[isBetterColor(2)?'colorRed':'colorGreen','font']">{{isBetter(2)}}</span>
        </div>
      </div>
    </div>
    <!-- 店铺链接 -->
    <div class="shopURL">
      <a href="#"><span>进店逛逛</span></a>
    </div>
  </div>
</template>

<script>
import DetailShopDesItem from './DetailShopDesItem'
export default {
  components : {
    DetailShopDesItem
  },
  props : {
    shopInfo : {
      type : Object,
      default : null
    }
  },
  data(){
    return{
      interval : null
    }
  },
  computed : {
    sellsItem(){
      if(this.shopInfo){
        return this.shopInfo.sells
      }
      return '0';
    },
    goodsCountItem(){
      if(this.shopInfo){
        return this.shopInfo.goodsCount
      }
      return '0';
    },
    isBetter(){
      if(this.shopInfo){
        return index => {
          return this.shopInfo.score[index].isBetter ? '高' : '低'
        }
      }
      return '0'
    }
  },
  created(){
    this.interval = setInterval(()=>{
      if(this.shopInfo){
        clearInterval(this.interval)
      }
    },10)
  },
  methods : {
    shopScore(score){
      if(score){
        return score.name + ' ' + score.score
      }
      return '0'
    },
    isBetterColor(index){
      if(this.shopInfo){
          return this.shopInfo.score[index].isBetter;
      }
    }
  }
}
</script>

<style scoped>
.detail-shop{
  border-bottom: 6px solid rgba(206, 203, 203, 0.3);
}
.detail-shop .shop-logo{
  display: flex;
  height: 40px;
  margin: 10px;
}
.shop-logo img{
  height: 100%;
  margin: 0 6px;
  border-radius: 50%;
}
.shop-logo span{
  display: inline-block;
  line-height: 40px;
  font-size: 18px;
}
.shop-content{
  display: flex;
}
.score{
  flex: 1;
  margin-top: 5px;
}
.score div{
  margin: 10px;
}
.score-desc{
  display: inline-block;
  width: 100px;

}
.colorRed{
  background-color: #f40;
}
.colorGreen{
  background-color: green;
}
.font{
  color: #fff;
  margin-left: 10px;
}
.shopURL{
  text-align: center;
  margin: 5px 0;
}
.shopURL a{
  display: inline-block;
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background-color: rgba(218, 218, 218,0.5);
}
</style>