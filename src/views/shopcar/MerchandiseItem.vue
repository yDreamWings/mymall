<template>
  <div class="merchandise-item" v-if="shopCarItem" >
    <input type="checkbox" :checked="shopCarItem.isCheck"  @click="checkBoxClick" ref="checkBox">
    <div class="merchandise-img">
      <img :src="shopCarItem.image" >
    </div>
    <div class="merchandise-content">
      <div class="merchandise-title">{{shopCarItem.title}}</div>
      <div class="merchandise-desc">{{shopCarItem.desc}}</div>
      <div class="merchandise-price">
        <span class="colorf40">{{shopCarItem.price * shopCarItem.count}}</span>
        <span>x{{shopCarItem.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    shopCarItem : {
      type : Object,
      default : null
    },
    allCheck : {
      type : Boolean,
      default : false
    }
  },
  methods : {
    checkBoxClick(){
      this.shopCarItem.isCheck = this.$refs.checkBox.checked;
      this.$emit('checkBoxClick')
    },
  },
  created(){
    this.$emit('created')
  }
}
</script>

<style scoped>
.merchandise-item{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
}
.merchandise-item input{
  margin: 0 5px;
}
.merchandise-item img{
  height: 100%;
  border-radius: 5px;
}
.merchandise-img{
  width: 17%;
  height: 100%;
  margin: 0 5px;
}
.merchandise-content{
  height: 100%;
  padding: 0 5px;
  width: 75%;
}
.merchandise-title,
.merchandise-desc,
.merchandise-price{
  height: 25px;
  line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.merchandise-desc{
  font-size: 10px;
  margin-bottom: 6px;
}
.merchandise-price{
  display: flex;
  justify-content: space-between;
}
.colorf40{
  color: #f40;
}
</style>