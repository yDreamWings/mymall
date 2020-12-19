<template>
  <div class="shop-item">
    <div class="shop-item-number">{{numberResolve(shopItem[0])}}</div>
    <div class="shop-item-content">{{shopItem[1]}}</div>
  </div>
</template>

<script>
export default {
  props : {
    shopItem : {
      type : Array,
      default : []
    }
  },
  methods : {
    numberResolve(number){
      if(number > 9999){
        return (parseInt(number)/10000).toFixed(2) + '万'
      }
      return number;
    }
  }
}
</script>

<style scoped>
.shop-item{
  width: 100px;
  height: 100px;
  /* border: 1px solid black; */
}
.shop-item-number,
.shop-item-content{
  text-align: center;
  /* border: 1px solid black; */
}
.shop-item-number{
  height: 60px;
  line-height: 60px;
  font-size: 18px;

}
.shop-item-content{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
</style>