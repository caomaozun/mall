import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}
