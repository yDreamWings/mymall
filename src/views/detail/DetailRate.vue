<template>
  <div class="detail-rate">
    <div class="rate-titel">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="user"  v-if="rateList">
      <img v-if="rateList.user" :src="rateList.user.avatar">
      <div v-if="rateList.user">{{rateList.user.uname}}</div>
    </div>
    <div class="rate-content" v-if="rateList">{{rateList.content}}</div>
    <img class="rate-img" v-if="rateList" :src="rateList.images" alt="">
    <div class="rateTime">{{rateDate}}</div>
  </div>
</template>

<script>
import {formatDate} from 'common/tools/utils.js'

export default {
  props : {
    rateData : {
      type : Object,
      default : null
    }
  },
  computed : {
    rateDate(){
      if(this.rateList){
        const date = new Date(this.rateList.created * 1000);
        let str = formatDate(date, 'yyyy-MM-dd hh:mm:ss') + ' ' + this.rateList.style;
        return str;
      }
      return null;
    },
    rateList(){
      if(this.rateData.list){
        return this.rateData.list[0];
      }
      return null;
    }
  },
}
</script>

<style scoped>
.detail-rate{
  padding: 10px;
  border-bottom: 3px solid rgba(206, 203, 203, 0.3);

}
.rate-titel{
  display: flex;
  height: 45px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(206, 203, 203, 0.3);
  line-height: 45px;
}
.user{
  display: flex;
  margin: 8px 0;
}
.user img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user div{
  line-height: 50px;
  margin: 0 10px;
}
.rate-content{
  line-height: 1.5em;
  font-size: 14px;
}
.rateTime{
  font-size: 12px;
  text-align: right;
}
</style>