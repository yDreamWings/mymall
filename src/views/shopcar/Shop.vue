<template>
  <div class="shop-car">
    <!-- 购物车标题 -->
    <NavBar color='pink'>
      <template v-slot:center>
        <div class="shop-car-title">购物车</div>
      </template>
    </NavBar>
    <BScroll  class="shop-car-scroll" ref="scroll">
      <!-- 购物车物品 -->
      <div class="merchandise" v-for="(value, index) in merchandiseArr" :key="value">
        <merchandiseItem 
          :shop-car-item="merchandiseArr[index]" 
          @created="refresh" 
          @checkBoxClick="checkBoxClick" />
      </div>
    </BScroll>
    <!-- 购物车结算栏 -->
    <div class="shop-car-settling-column">
      <div class="settling-column-left">
        <input type="checkbox" :checked="isAllCheck" ref="allCheckBox" @click="allCheckClick">
        <span class="font14">全选</span>
        <span class="m010">合计：</span>
        <span class="cf40">￥{{theTotalPrice}}</span>
      </div>
      <div class="settling-column-right" @click="settlementClick">去结算</div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import MerchandiseItem from './MerchandiseItem'
import NavBar from 'components/common/navbar/NavBar.vue'
import BScroll from 'common/tools/scroll/BScroll.vue'

import Toast from 'common/tools/toast/Toast.vue'


export default {
  components : {
    MerchandiseItem,
    NavBar,
    BScroll,
    Toast
  },
  data(){
    return {
      theTotalPrice : 0,
      isAllCheck : false,
    }
  },
  computed : {
    merchandiseArr() {
      return this.$store.state.shopCar
    },
  },
  methods : {
    //滚动条刷新
    refresh(){
      if(this.$refs.scroll){
        this.$refs.scroll.refresh();
      }
    },
    // 计算总价格
    totalPrice() {
      let totalPrice = 0;
      if(this.merchandiseArr){
        for(let m of this.merchandiseArr){
          if(m.isCheck){
            totalPrice += parseFloat(m.price) * m.count;
          }
        }
      }
      this.theTotalPrice = totalPrice;
    },
    // 全选状态判断
    isAllCheckState() {
      if(this.merchandiseArr){
        for(let m of this.merchandiseArr){
          if(!m.isCheck){
            this.isAllCheck = false;
            return;
          }
          this.isAllCheck = true;
        }
      }
    },
    // 商品按钮点击
    checkBoxClick() {
      this.isAllCheckState();
      this.totalPrice();
    },
    // 全选按钮点击
    allCheckClick() {
      this.isAllCheck = this.$refs.allCheckBox.checked;
      if(this.merchandiseArr){
        for(let m of this.merchandiseArr){
          m.isCheck = this.isAllCheck;
        }
      }
      this.totalPrice();
    },
    settlementClick(){
      for(let m of this.merchandiseArr){
          if(m.isCheck){
            return;
          }
      }
      this.$refs.toast.show('未选择商品', 1000)
    }
  }
}
</script>

<style scoped>
.merchandise{
  width: 100%;
  height: 100px;
  border-bottom: 3px solid rgba(206, 203, 203, 0.3);
}
.shop-car-title{
  flex: 1;
}
.shop-car-settling-column{
  position: absolute;
  display: flex;
  bottom: 50px;
  width: 100%;
  height: 40px;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.3);
}
.settling-column-left{
  width: 75%;
  line-height: 40px;
  background-color: rgb(238, 238, 238);
}
.settling-column-right{
  width: 25%;
  text-align: center;
  line-height: 40px;
  background-color: #f40;
  color: #fff;
}
.settling-column-left input {
  margin: 0 6px;
}
.shop-car-scroll{
  position: absolute;
  top: 44px;
  bottom: 90px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.m010{
  margin-left: 20px;
}
.font14{
  font-size: 14px;
}
.cf40{
  color: #f40;
}
</style>