<template>
  <div class="tabbar">
      <Item path="/home">首页</Item>
      <Item imgUrl="../img/fenlei.svg" path="/fenlei">分类</Item>
      <Item imgUrl="../img/gouwuche.svg" path="/shop">购物车</Item>
      <Item imgUrl="../img/profile.svg" path="/user">我的</Item>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  components : {
    Item
  }
}
</script>

<style scoped>
.tabbar{
  display: flex;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 49px;
  background: rgb(238, 238, 238);
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding:2px 20px 0;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.3);
}
</style>