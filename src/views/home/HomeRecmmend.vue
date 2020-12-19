<template>
  <div class="home-recmmend">
    <span v-for="(value, index) in imgList" :key="'recommend'+index">
      <a :href="value.link">
        <img :src="value.image">
        <div>{{value.title}}</div>
      </a>
    </span>
  </div>
</template>

<script>
export default {
  props : {
    recommendData : {
      type : Object,
      default : null,
    }
  },
  data(){
    return {
      getImgListInterval : null,
      imgList : null,
    }
  },
  methods : {
    //监听是否取得数据
    getImgList(){
      this.getImgListInterval = setInterval(() => {
        if(this.recommendData){
          this.imgList = this.recommendData.list;
          clearInterval(this.getImgListInterval);
        }
      }, 10);
    }
  },
  created(){
    this.getImgList()
  }
}
</script>

<style scoped>
.home-recmmend{
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 8px solid rgba(131, 127, 127, 0.1);
}
.home-recmmend span{
  display: inline-block;
  flex: 1;
  text-align: center;
  font-size: 14px;
}
img{
  height: 75px;
  width: 75px;
  border-radius: 50%;

}
</style>