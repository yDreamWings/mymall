<template>
  <div class="item" @click="pathTo(path)">
    <img :src="imgUrl" :class="{active:isActive}">
    <div class="content" :class="{red:isActive}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    imgUrl : {
      type : String,
      default : '../img/home.svg'
    },
    text : {
      type : String,
      default : '首页'
    },
    path : {
      type : String,
      default : ''
    }
  },
  computed : {
    isActive(){
      return this.$route.path.includes(this.path)
    }
  },
  methods : {
    pathTo (path){
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped>
.item{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.content{
  margin-top: 2px;
  color:#5d656b;
  font-size: 12px;
}
.active{
  position: relative;
  bottom: 3px;
}
.red{
  color: rgb(250, 144, 162);
  font-weight: 600;
}
</style>