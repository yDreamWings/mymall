<template>
  <div class="detail">
    <!-- 详情页导航栏 -->
    <DetailNav @tabControlClick="tabControlClick" ref="detailnav"></DetailNav>
    <BScroll class="scrollstyle" ref="scroll" probeType="3" @getScroll="getScroll">
      <!-- 详情页轮播图 -->
      <div class="detail-shuffigure">
        <ShufFigure :imgs="topImage"></ShufFigure>
      </div>
      <!-- 内容区 -->
      <div class="detail-content">
        <!-- 标题 -->
        <p class="detail-title">{{title}}</p>
        <!-- 价格 -->
        <div class="detail-price">
          <span class="detail-now-price">￥{{goods.lowNowPrice}}</span>
          <span class="detail-height-price">{{goods.oldPrice}}</span>
          <span class="detail-discountDesc" :style="{'background-color':goods.discountBgColor}">{{goods.discountDesc}}</span>
        </div>
        <!-- 销量、收藏 -->
        <div class="detail-columns">
          <span class="column" v-for="value in goods.columns" :key="value">{{value}}</span>
        </div>
        <!-- 商家服务 -->
        <div class="detail-services">
          <div class="services" v-for="service in goods.services" :key="service">
            <img :src="service.icon" v-if="service.icon">
            <span>{{service.name}}</span>
          </div>
        </div>
      </div>
      <!-- 店铺信息 -->
      <DetailShop :shopInfo="shop" @refresh="refresh"></DetailShop>
      <div class="showImg">
        <img v-for="img in detailImg" :src="img" :key="img" @load="imgLoad">
      </div>
      <!-- 参数-尺寸大小 -->
      <SizeTable :rule="itemParams.rule" ref="sizetable"></SizeTable>
      <!-- 参数-商品参数 -->
      <DetailParamsInfo :info="itemParams.info"></DetailParamsInfo>
      <!-- 用户评价 -->
      <DetailRate :rateData="rate" ref="detailrate"></DetailRate>
      <!-- 推荐 -->
      <GoodsList :goods="recommendLit" ref="goodslist"></GoodsList>
    </BScroll>
    <Toast ref="toast"></Toast>
    <detailTabBar @addToShopCar="addToShopCar"></detailTabBar>
  </div>
</template>

<script>
import ShufFigure from 'common/tools/ShufFigure.vue'
import BScroll from 'common/tools/scroll/BScroll.vue'
import Toast from 'common/tools/toast/Toast.vue'

import GoodsList from 'components/content/goods/GoodsList'

import DetailNav from './DetailNav'
import DetailShop from './DetailShop'
import detailTabBar from './DetailTabBar'
import SizeTable from './sizeTabe'
import DetailParamsInfo from './DetailParamsInfo'
import DetailRate from './DetailRate'

import {getDetailData, Goods, Shop, getDetailRecommend} from 'network/detail.js'
import {imgResolveData} from 'common/tools/utils.js'

export default {
  name : 'Detail',
  components : {
    DetailNav,
    ShufFigure,
    DetailShop,
    BScroll,
    detailTabBar,
    SizeTable,
    DetailParamsInfo,
    DetailRate,
    GoodsList,
    Toast
  },
  data(){
    return {
      iid : null,         //商品id
      detailData : null,  //详情页所有数据
      topImage : [],      //轮播图
      title : null,       //商品标题
      shop : {},          //店铺
      goods : {},         //商品
      detailImg : [],     //展示图片
      itemParams : {},    //参数
      rate : {},          //评论
      recommendLit : [],  //推荐
      isScrollTo : false,
    }
  },
  created(){
    this.iid = this.$route.params.iid;
    this.getDetail(this.iid);
    this.getDetailRecommend();
  },
  computed : {
    itemParamsOffsetTop(){
      if(this.$refs.sizetable){
        return this.$refs.sizetable.$el.offsetTop;
      }
      return null;
    },
    rateOffsetTop(){
      if(this.$refs.detailrate){
        return this.$refs.detailrate.$el.offsetTop;
      }
      return null;
    },
    goodsListOffsetTop(){
      if(this.$refs.goodslist){
        return this.$refs.goodslist.$el.offsetTop;
      }
      return null;
    },
    offsetTopArr(){
      if(this.itemParamsOffsetTop && this.rateOffsetTop && this.goodsListOffsetTop){
        return [0, this.itemParamsOffsetTop, this.rateOffsetTop, this.goodsListOffsetTop];
      }
      return null;
    }
  },
  methods : {
    // 获取详情页数据
    getDetail(iid){
      getDetailData(iid).then( value => {
        this.detailData = value.data.result;
        // 获取商品参数
        this.itemParams = this.detailData.itemParams;
        // 获取轮播图图片
        this.topImage = imgResolveData(this.detailData.itemInfo.topImages);
        //获取详情页标题
        this.title = this.detailData.itemInfo.title;
        //获取商品信息
        this.goods = new Goods(this.detailData.itemInfo, this.detailData.columns, this.detailData.shopInfo.services);
        //获取商家信息
        this.shop = new Shop(this.detailData.shopInfo);
        // 穿着效果展示
        this.detailImg = this.detailData.detailInfo.detailImage[0].list;
        //获取评论信息
        this.rate = this.detailData.rate;
      });
    },
    // 获取详情页推荐数据
    getDetailRecommend(){
      getDetailRecommend().then( value => {
        this.recommendLit = value.data.data.list;
      })
    },
    // 滚动条刷新
    refresh(){
      if(this.$refs.scroll){
        this.$refs.scroll.refresh()
      }
    },
    // 图片加载完成刷新
    imgLoad(){
      this.refresh()
    },
    //滚动条监听函数
    getScroll(e){
      if(this.offsetTopArr && !this.isScrollTo){
        if(-e.y >= this.offsetTopArr[1] && -e.y < this.offsetTopArr[2]){
          if(this.$refs.detailnav.isClick == 1){return;}
          this.$refs.detailnav.isClick = 1;
        }else if(-e.y >= this.offsetTopArr[2] && -e.y < this.offsetTopArr[3]){
          if(this.$refs.detailnav.isClick == 2){return;}
          this.$refs.detailnav.isClick = 2;
        }else if(-e.y >= this.offsetTopArr[3]){
          if(this.$refs.detailnav.isClick == 3){return;}
          this.$refs.detailnav.isClick = 3;
        }else{
          if(this.$refs.detailnav.isClick == 0){return;}
          this.$refs.detailnav.isClick = 0;
        }
      }
    },
    // 控制栏点击
    tabControlClick(e){
      if(this.offsetTopArr){
        this.isScrollTo = true;
        this.$refs.detailnav.isClick = e;
        this.$refs.scroll.scrollTo(0, -this.offsetTopArr[e], 500);
        setTimeout(()=>{
          this.isScrollTo = false;
        }, 500)
      }
    },
    // 加入购物车
    addToShopCar(){
      const  merchandise = {}
      merchandise.image = this.topImage[0].imgURL,
      merchandise.title = this.title,
      merchandise.desc = this.goods.desc,
      merchandise.price = this.goods.lowNowPrice,
      merchandise.iid = this.iid
      this.$store.dispatch('addToCar', merchandise).then(value => {
        this.$refs.toast.show(value, 1000)
      });
    }
  }
}
</script>

<style scoped>
.detail-shuffigure{
  height: 450px;
  width: 100%;
  margin: 0 auto;
}
.scrollstyle{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.detail-title{
  color: #666;
  font-size: 17px;
  margin: 8px 6px;
  font-weight: 600;
}
.detail-price{
  position: relative;
}
.detail-now-price{
  color: #f40;
  margin: 0 5px 0 6px;
  font-size: 24px;
  font-weight: 600;
}
.detail-height-price{
  font-size: 14px;
  text-decoration: line-through;
  padding-right: 5px;
}
.detail-discountDesc{
  position: absolute;
  top: 0;
  font-size: 14px;
  color: #fff;
  padding: 3px;
  border-radius: 8px;
}
.detail-columns{
  display: flex;
  margin: 5px;
  font-size: 14px;
  color: rgb(180, 177, 177);
  border-bottom: 1px solid rgba(206, 203, 203, 0.3);
}
.column{
  flex: 1;
  margin: 3px;
  text-align: center;
}
.detail-services{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 6px solid rgba(206, 203, 203, 0.3);
}
.services{
  display: flex;
  height: 24px;
  align-items: center;
  line-height: 24px;
  margin: 5px;
}
.services img{
  height: 16px;
}
.services span{
  display: inline-block;
  font-size: 15px;
  height: 24px;
}
.showImg img{
  width: 100%;
  border-bottom: 6px solid rgba(206, 203, 203, 0.3);
}
</style>