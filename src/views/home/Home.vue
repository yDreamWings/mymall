<template>
  <div class="home">
    <!-- 首页导航栏 -->
    <div class="nav">
      <NavBar color='pink'>
        <template v-slot:center>
          <div class="home-title">购物街</div>
        </template>
      </NavBar>
    </div>
    <!-- 首页副导航栏 -->
    <div class="item" v-show="isTabControlfixed" >
        <TabControlBar :titles="homeFilter" @tabControlClick="tabControlClick" ref="itemfixed"></TabControlBar>
    </div>
    <!-- 可滚动区域 -->
    <BScroll class="scrollstyle" 
      probe-type="3" 
      pullUpLoad="true" 
      @getScroll="getScroll"
      @getPullUpLoad="getPullUpLoad" 
      ref="bscroll">
      <!-- 轮播图 -->
      <div class="panner">
        <ShufFigure :imgs="imgData"></ShufFigure>
      </div>
      <!-- 推荐 -->
      <div class="recomment">
        <HomeRecmmend :recommendData="homeRecommend"></HomeRecmmend>
      </div>
      <!-- 本周流行 -->
      <div class="keywords">
        <div class="text">本周流行</div>
        <HomeKeywords :keywordsData="homeKeywords"></HomeKeywords>
      </div>
      <!-- 首页副导航栏 -->
      <TabControlBar :titles="homeFilter" @tabControlClick="tabControlClick"  ref="item"></TabControlBar>
      <!-- 商品展示 -->
      <div class="goods">
        <GoodsList :goods="tabControlData[type].list"></GoodsList>
      </div> 
    </BScroll>
    <!-- 返回顶部按钮 -->
    <div class="back-top">
      <BackTop @click.native="backTopClick"  v-show="isBscrollShow"></BackTop>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import ShufFigure from 'common/tools/ShufFigure.vue'
import BScroll from 'common/tools/scroll/BScroll.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControlBar from 'components/common/tabcontrolbar/TabControlBar'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import HomeRecmmend from './HomeRecmmend'
import HomeKeywords from './HomeKeywords'

import {getHomeMultidata, getHomeTabControldata} from 'network/home'
import {debounce, imgResolveData} from 'common/tools/utils.js'
import {goodsListItemLoad} from 'common/tools/mixin.js'

export default {
  components : {
    NavBar,
    BScroll,
    ShufFigure,
    HomeRecmmend,
    HomeKeywords,
    TabControlBar,
    GoodsList,
    BackTop
  },
  data(){
    return {
      homeMultidData : [],
      banner : [],
      imgData : [],
      homeData : [],
      tabControlData : {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []},
      },
      type : 'pop',
      isBscrollShow : false,
      isTabControlfixed : false,
      scrollY : 0,
    }
  },
  computed : {
    homeRecommend(){
      return this.homeMultidData.recommend;
    },
    homeKeywords(){
      return this.homeMultidData.keywords;
    },
    homeFilter(){
      return this.homeData.filter.list;
    },
    clientHeight(){
      return document.documentElement.clientHeight;
    }
  },
  created(){
    this.getHomeMultidata();
    this.getHomeTabControldata('pop');
    this.getHomeTabControldata('new');
    this.getHomeTabControldata('sell');
  },
  mixins : [goodsListItemLoad],
  mounted(){
    this.goodsItemClick();
  },
  activated(){
    this.$refs.bscroll.scrollTo(0, this.scrollY);
    this.$refs.bscroll.refresh();
  },
  deactivated(){
    this.scrollY = this.getScrollY();
    this.$bus.off();
  },
  methods : {
    showData(){
      console.log(this.homeKeywords)
    },
    /**
     * 事件监听
     */
    //控制栏点击事件
    tabControlClick(e){
      this.type = e.type;
      this.$refs.itemfixed.isClick = e.index;
      this.$refs.item.isClick = e.index;
    },
    // 商品点击事件
    goodsItemClick(){
      this.$bus.on("goodsItemClick", (e)=>{
        this.$router.push('/detail/' + e.iid);
      })
    },
    //返回顶部点击事件
    backTopClick(){
      this.$refs.bscroll.scrollTo(0, 0, 500)
    },
    // 获取滚动条位置
    getScrollY(){
      return this.$refs.bscroll.getScrollY();
    },
    //获取滚动条滚动事件
    getScroll(e){
        this.isBscrollShow = -e.y > (this.clientHeight - 93) ? true : false;
        if(this.$refs.item){
          this.isTabControlfixed = (-e.y >= this.$refs.item.$el.offsetTop) ? true : false;
        }
    },
    //获取上拉加载事件
    getPullUpLoad(){
      this.getHomeTabControldata(this.type);
      setTimeout(() => {
        this.$refs.bscroll.finishPullUp()
      }, 1000);
    },
    /**
     * 数据请求
     * type  数据类型参数
     */
    getHomeMultidata(){
      getHomeMultidata().then(value => {
        this.homeMultidData = value.data.data;
        this.banner = value.data.data.banner;
        this.imgData = imgResolveData(this.banner.list, 'image', 'link');
      });
    },
    getHomeTabControldata(type){
      const page = this.tabControlData[type].page + 1;
      getHomeTabControldata(type,page).then(value=>{
        this.homeData = value.data.data;
        this.tabControlData[type].page = value.data.data.page;
        this.tabControlData[type].list.push(...value.data.data.list);
      })
    },
  }
}
</script>

<style scoped>
.home{
  height: 100vh;
  position: relative;
}
.home-title{
  flex: 1;
}
.scrollstyle{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.panner{
  width: 100%;
  height: 150px;
  margin: 0 auto;
  /* overflow: hidden; */
}
.recomment{
  margin-top: 10px;
}
.keywords .text{
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: 600;
}
.item{
  position: relative;
  z-index: 9;
}
</style>