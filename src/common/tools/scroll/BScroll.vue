/**
 * probeType String   better-scroll的 probeType参数，[1, 2, 3]
 * pullUpLoad String  better-scroll的 pullUpLoad参数，是否开启上拉到底部监听，true/false
 * scrollTo(x, y, time) 滚动条跳转
 * refresh()  刷新
 * getScroll  监听滚动条事件
 * getScrollY()  获取当前滚动条
 * getPullUpLoad()  监听上拉加载事件
 * finishPullUp()  上拉加载完成
 */
<template>
  <div class="better-scroll-wrapper" ref="scrollwrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props : {
    probeType : {
      type : String,
      default : '1'
    },
    pullUpLoad : {
      type : String,
      default : 'false'
    }
  },
  date(){
    bscroll : null
  },
  computed : {
    pullUpLoadToBoolean(){
      return this.pullUpLoad == 'true';
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initScroll();
    })
  },
  methods : {
    //初始化better-scroll
    initScroll(){
      this.bscroll = new BScroll(this.$refs.scrollwrapper, {
        click : true,
        probeType : parseInt(this.probeType),
        pullUpLoad : this.pullUpLoadToBoolean,
        mouseWheel: true,//开启鼠标滚轮
        disableMouse: false,//启用鼠标拖动
        disableTouch: false//启用手指触摸
      });
      this.getScroll();
      this.getPullUpLoad();
      setTimeout(() => {
        this.refresh();
      }, 500);
    },
    //滚动条跳转
    scrollTo(x, y, time=500){
     this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    //上拉加载完成
    finishPullUp(){
      this.bscroll && this.bscroll.finishPullUp();
    },
    refresh(){
      this.bscroll && this.bscroll.refresh();
    },
    //监听滚动条事件
    getScroll(){
      this.bscroll.on('scroll', (option)=>{
        this.$emit('getScroll', option)
      })
    },
    getScrollY(){
      return this.bscroll ? this.bscroll.y : 0;
    },
    //监听上拉加载
    getPullUpLoad(){  
      if(this.pullUpLoadToBoolean){
        this.bscroll.on('pullingUp', ()=>{
          this.$emit('getPullUpLoad')
        })
      }
    }
  }
}
</script>

<style scoped>
</style>