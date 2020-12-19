import {debounce} from 'common/tools/utils.js'

//防抖刷新
export const goodsListItemLoad = {
  data(){
    return {
      goodsListItemLoadFn : null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.bscroll.refresh,500);
    this.goodsListItemLoadFn = function (){
      refresh();
    }
    this.$bus.on('ImgItemChange', this.goodsListItemLoadFn)
  }
}