<template>
  <div class="nav-bar" :style="'background-color:'+color">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  props : {
    color : {
      type : String,
      default : ''
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
}
.left,
.right{
  width: 60px;
}
.center{
  flex: 1;
  text-align: center;
  display: flex;
}
</style>