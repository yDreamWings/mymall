<template>
  <div class="detail-params-info">
    <div class="info-set" v-if="info">
      <div class="info-row" v-for="set in info.set" :key="set">
        <div class="key">{{set.key}}</div>
        <div class="value">{{set.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    info : {
      type : Object,
      default : null
    }
  }
}
</script>

<style scoped>
.detail-params-info{
  margin: 10px;
  font-size: 14px;
  border-bottom: 3px solid rgba(206, 203, 203, 0.3);
}
.info-row{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(206, 203, 203, 0.3);
}
.key{
  width: 15%;
}
.value{
  color: deeppink;
}
</style>