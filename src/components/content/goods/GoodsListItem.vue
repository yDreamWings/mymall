<template>
  <div class="goods-list-item" @click="goodsItemClick" v-if="goodsItem">
    <img v-if="goodsItem.show" :src="goodsItem.show.img">
    <img v-if="goodsItem.image" :src="goodsItem.image">
    <div class="content">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    goodsItem : {
      type : Object,
      default(){
        return {}
      }
    },
    imgsrc : {
      type : String,
      default : '#'
    }
  },
  created(){
    this.$bus.emit("ImgItemChange")
  },
  unmounted(){
    this.$bus.emit("ImgItemChange")
  },
  methods : {
    goodsItemClick(){
      this.$bus.emit("goodsItemClick",this.goodsItem)
    }
  }
}
</script>

<style scoped>
.goods-list-item{
  width: 100%;
  height: 100%;
  text-align: center;
}
.goods-list-item img{
  width: 100%;
  height: 80%;
  padding: 8px;
  border-radius: 15px;
}
.content{
  font-size: 14px;
}
.title{
  width: 100%;
  height: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price{
  display: inline-block;
  padding: 8px 10px 0 0;
  color: #f40;
}
.cfav::before{
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 3px;
  background-image: url(~assets/img/ItemCollection.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>