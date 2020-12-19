<template>
  <div id="nav">
    <router-view v-slot="{ Component }">   
      <keep-alive exclude="Detail">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from 'components/common/tabbar/Tabbar.vue';
import Vue from 'vue';
export default {
  components : {
    Tabbar
  },
  created (){
      this.$router.replace('/home');
    }
  }
</script>
<style>
@import './assets/css/base.css';
</style>
