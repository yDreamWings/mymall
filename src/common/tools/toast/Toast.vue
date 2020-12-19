<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  data(){
    return {
      message : '',
      isShow : false,
      showTimer : null
    }
  },
  methods : {
    show(message, time=1000){
      clearTimeout(this.showTimer)
      // 显示
      this.message = message;
      this.isShow = true;
      // 取消显示
      this.showTimer = setTimeout(()=>{
        this.isShow = false;
        this.message = '';
      }, time)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  z-index: 10;
}
</style>