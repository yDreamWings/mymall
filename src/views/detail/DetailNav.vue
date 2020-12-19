<template>
  <div class="detail-nav">
    <NavBar color='#fff'>
      <!-- 左侧内容 -->
      <template v-slot:left>
        <div class="backToHome" @click="backHome">&lt;</div>
      </template>
      <!-- 中间内容 -->
      <template v-slot:center>
        <div class="item" v-for="(value, index) in titles" :key="value+index" @click="tabControlClick(index)" >
          <span :class="{frontpink:isClick==index}">
            {{value}}
            <div :class="{backpink:isClick==index}"></div>
          </span>
        </div>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components : {
    NavBar,
  },
  data(){
    return {
      titles : ['商品', '参数', '评论', '推荐'],
      isClick : 0,
    }
  },
  methods : {
    backHome(){
      this.$router.back()
    },
    tabControlClick(index){
      this.isClick = index
      this.$emit('tabControlClick', index);
    }
  }
}
</script>

<style scoped>
.nav-item{
  display: flex;
}
.detail-title{
  flex: 1;
  font-size: 14px;
}
.backToHome{
  text-align: center;
  font-size: 25px;
}
.frontpink{
  color: deeppink;
}
.backpink{
  background-color: deeppink;
}
.item{
  flex: 1;
  text-align: center;
}
.item span{
  display: inline-block;
  font-size: 14px;
}
.item span div{
  width: 100%;
  height: 2px;
  margin-top: -5px;
  border-radius: 6px;
}
</style>