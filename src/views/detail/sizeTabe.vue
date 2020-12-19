<template>
  <div class="size-table">
    <div v-if="rule">
      <div class="row" v-for="table in rule.tables[0]" :key="table">
        <span v-for="value in table" :key="value">{{value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    rule : {
      type : Object,
      default : null
    }
  }
}
</script>

<style scoped>
.size-table{
  margin: 0 15px;
  border-bottom: 3px solid rgba(206, 203, 203, 0.3);
}
.row{
  display: flex;
  height: 35px;
  border-bottom: 1px solid rgba(206, 203, 203, 0.3);
}
.row span{
  flex: 1;
  font-size: 14px;
  line-height: 35px;
}
</style>