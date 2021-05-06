<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods-list="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommends} from "@/network/detail";
  import {debounce} from "@/common/utils";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // itemImgListener: null
      }
    },
    mixins: [itemListenerMixin],
    created() {
      // 1.获取iid
      this.iid = this.$route.params.iid
      // 2.获取详情页数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 获取轮播图数据
        this.topImages = res.result.itemInfo.topImages
        // 获取商品基本信息数据
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(res.result.shopInfo)
        // 获取商品详情数据
        this.detailInfo = res.result.detailInfo
        // 获取商品参数数据
        this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
        // 获取评论数据
        if(res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0]
        }
      })
      // 3.获取推荐数据
      getRecommends().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {
      /*const newRefresh = debounce(this.$refs.scroll.refresh, 500)
      this.itemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener)*/
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
    /*overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;*/
  }
</style>
