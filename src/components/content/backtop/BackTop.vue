<template>
  <div class="back-top">
    <img class="imgtop" :src="Top" >
  </div>
</template>

<script>
import Top from 'assets/svg/top.png'
export default {
  data(){
    return {
      Top
    }
  }
}
</script>

<style scoped>
.back-top{
  position:fixed;
  bottom: 60px;
  right: 5px;
}
div.back-top img{
  background-color: rgb(182, 178, 178);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 6px 6px;
}
</style>