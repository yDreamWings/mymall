<template>
  <div class="tab-control-bar">
    <div v-for="(value, index) in titles" :key="value.sort+index" @click="tabControlClick(index,value.sort)" >
      <span :class="{frontpink:isClick==index}">{{value.title}}<div :class="{backpink:isClick==index}"></div></span>
      </div>
  </div>
</template>

<script>
export default {
  props : {
    titles : {
      type : Array,
      default : null
    }
  },
  data(){
    return {
      isClick : 0
    }
  },
  methods : {
  tabControlClick(index, sort){
    let e = {index: index, type : sort};
    this.isClick = index
    this.$emit('tabControlClick', e)
  }

  }
}
</script>

<style scoped>
.tab-control-bar{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-bar div{
  flex: 1;
  text-align: center;
}
.tab-control-bar div span{
  display: inline-block;
  font-size: 14px;
  /* color: pink; */
}
.tab-control-bar span div{
  width: 100%;
  height: 2px;
  margin-top: -5px;
  border-radius: 6px;
}
.frontpink{
  color: deeppink;
}
.backpink{
  background-color: deeppink;
}
</style>