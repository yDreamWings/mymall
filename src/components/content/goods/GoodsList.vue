<template>
  <div class="goods-list">
    <div class="item" v-for="(value, index) in goods" :key="'pop'+index">
      <GoodsListItem :goodsItem="goods[index]"></GoodsListItem>
    </div>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components : {
    GoodsListItem
  },
  props : {
    goods : {
      type : Array,
      default : null
    }
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 8px 0 8px;
}
.item{
  flex: 0 0 50%;
  width: 45%;
  height: 270px;
}
</style>