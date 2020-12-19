<template>
  <div class="tab-control-bar">
    <div v-for="(value, index) in titles" :key="value+index" @click="tabControlClick(index)" >
      <span :class="{frontpink:isClick==index}">{{value}}<div :class="{backpink:isClick==index}"></div></span>
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
    tabControlClick(index){
      this.isClick = index
      this.$emit('tabControlClick', index);
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