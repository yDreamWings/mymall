<template>
  <div class="home-keywords">
    <span v-for="(value, index) in imgList" :key="'keywords'+index" :style="'flex: 0 0 '+(1/rowNumber)*100+'%'">
      <a :href="value.link">
        <img :src="value.image">
        <div>{{value.words}}</div>
      </a>
    </span>
  </div>
</template>

<script>
export default {
  props : {
    keywordsData : {
      type : Object,
      default : null,
    },
    rowNumber : {
      type : Number,
      default : 4
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
        if(this.keywordsData){
          this.imgList = this.keywordsData.list;
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
.home-keywords{
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 8px solid rgba(131, 127, 127, 0.1);
  flex-wrap: wrap;
}
.home-keywords span{
  display: inline-block;
  flex: 0 0 25%;
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
}
img{
  height: 75px;
  width: 75px;
  border: 1px solid pink;
  border-radius: 50%;
}
</style>