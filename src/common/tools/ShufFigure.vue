<template>
  <div class="shuffing-figure">
    <div class="imgdiv">
      <img v-for="(value, index) in imgs" :src="imgs[index].imgURL" :key="'img'+index" @click="imgClick(value)">
    </div>
    <div class="countdiv">
      <span v-for="(value, index) in imgs" :key="'span'+index" @click="spClick(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    imgs : {
      type : Array,
      default : []
    }
  },
  data(){
    return {
      completeInterval : null,
      imgInterval : null,
      imgCount : 0,
      startX : 0,
      moveBefor : 0,
      moveNow : 0,
      distenceX : 0,
      endX : 0,
      isMove : 0,
    }
  },
  computed : {
    imgdiv(){
      if(document.getElementsByClassName('imgdiv')[0]){
        return document.getElementsByClassName('imgdiv')[0]
      }
      return null;
    },
    countdiv(){
      if(document.getElementsByClassName('countdiv')[0]){
        return document.getElementsByClassName('countdiv')[0]
      }
      return null;
    },
    pannerImgArr(){
      if(document.getElementsByClassName('imgdiv')[0]){
        return document.getElementsByClassName('imgdiv')[0].children
      }
      return null;
    },
    pannerSpArr(){
      if(document.getElementsByClassName('countdiv')[0]){
        return document.getElementsByClassName('countdiv')[0].children
      }
      return null
    },
    imgLen(){
      if(this.imgs){
        return this.imgs.length
      }
      return null;
    },
    startMarginLeft(){
      if(this.pannerImgArr){
        return this.pannerImgArr[0].style.marginLeft;
      }
      return null
    },
    imgWidth(){
      if(document.getElementsByClassName('imgdiv')[0]){
        return document.getElementsByClassName('imgdiv')[0].offsetWidth;
      }
      return null
    }
  },
  mounted(){
    this.isCompleteHome();
  },
  methods : {
    //检测数据是否传输完成
    isCompleteHome(){
      this.completeInterval = setInterval(() => {
        if(this.imgLen != 0 && this.imgLen != null){
          this.initImg();
          this.imgMoveAuto();
          this.initCountDiv();
          if(this.imgdiv){
            this.imgTouchMove();
          }
          // this.setTransForm()
          clearInterval(this.completeInterval);
        }
      }, 10);
    },
    //初始化当前图片
    initImg(){
        if(this.pannerImgArr){
          this.pannerImgArr[0].style.marginLeft = -this.imgCount*100 + '%';
        }
    },
    //自动移动图片
    imgMoveAuto(){
      if(this.pannerImgArr && this.pannerSpArr){
        this.imgInterval = setInterval(() => {
          this.pannerImgArr[0].style.marginLeft = -this.imgCount*100 + '%';
          this.initCountDiv();
          this.imgCount = (++this.imgCount) % this.imgLen;
        }, 2000)
      }
    },
    //初始化计数条
    initCountDiv(){
      if(this.pannerSpArr){
        for(let spIndex = 0; spIndex < this.imgLen; spIndex++){
          this.pannerSpArr[spIndex].style.backgroundColor = 'lightgrey';
        }
        this.pannerSpArr[this.imgCount].style.backgroundColor = 'deeppink';
      }
    },
    //计数条点击事件
    spClick(index){
      this.imgCount = index;
      this.initCountDiv();
      this.pannerImgArr[0].style.marginLeft = -index*100 + '%';
    },
    //图片点击事件
    imgClick(value){
      if(value.link){
        location.href = value.link
      };
    },
    //图片滑动事件
    imgTouchMove(){
      this.imgdiv.addEventListener('touchstart', (e)=>{
        clearInterval(this.imgInterval);
        this.startX = e.touches[0].pageX;
      })

      this.imgdiv.addEventListener('touchmove', (e)=>{
        let margin_left = this.pannerImgArr[0].style.marginLeft;
        let width = e.target.offsetWidth;

        this.moveNow  = e.touches[0].pageX - this.startX; 
        this.distenceX = this.moveNow - this.distenceX;
        if((this.imgCount == 0 && this.distenceX > 0) || (this.imgCount == this.imgLen-1 && this.distenceX < 0)){
          this.distenceX = 0;
        }else{
          this.pannerImgArr[0].style.marginLeft = parseInt(margin_left) + (this.distenceX / width)*100 + '%';
          this.isMove = true;
          this.distenceX = this.moveNow;
        }
      })

      this.imgdiv.addEventListener('touchend', (e)=>{
        this.imgMoveAuto();
        if(this.isMove){
          if(Math.abs(this.distenceX / e.target.offsetWidth) < 0.3){
            this.imgCount = this.imgCount;
          }else if(this.distenceX / e.target.offsetWidth < -0.3){
            this.imgCount++;
          }else{
            this.imgCount--;
          }
          this.initImg();
          this.initCountDiv();
        }
        this.isMove = false;
        this.distenceX = 0; 
        this.moveNow = 0;
      })
    },
    
  }
}
</script>

<style scoped>

.imgdiv{
  display: flex;
}
.shuffing-figure,
.imgdiv{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
img{
  width: 100%;
}
.imgdiv{
  overflow: hidden;
}
img{
  transition: 0.5s;
}
.countdiv{
  text-align: center;
  margin-top: -20px;
}
span{
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: lightgrey;
  border-radius: 50%;
  margin-left: 10px;
}
</style>