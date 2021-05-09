<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods-list="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"/>
    <detail-bottom-bar @addCart="addToCart"/>
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
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParam, getRecommends} from "@/network/detail";
  // import {debounce} from "@/common/utils";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

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
      GoodsList,
      DetailBottomBar
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
        themeTopYs: [],
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        // 将offsetTop添加到定义的数组themeTopYs中
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        // console.log(index);
        // this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        this.$refs.scroll.scrollToTop(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position);
        // 获取Y值
        const positionY = -position.y
        // 判断tabTop是否显示
        this.isShow = (-position.y) > 1000
        // positionY和标题的themeTopYs中的值对比
        // 举例：themeTopYs:[0, 1000, 2000, 3000]则positionY在0-1000间index=0,1000-2000间index=1,2000-3000间index=2，大于3000时index=3
        // 1.下面let i in this.themeTopYs不能用
        /*for (let i in this.themeTopYs) {
          if(positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i+1)]) {
            console.log(i);
          }
        }*/
        // 2.下面i=0/1/2时没问题，i=3时this.themeTopYs[i+1]会越界导致出错
        /*for (let i = 0; i < this.themeTopYs.length; i++) {
          if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {

          }
        }*/
        // 3.这样不会越界但是还存在问题：positionY和this.themeTopYs[i]频繁比较
        /*let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length - 1 && positionY > this.themeTopYs[i])) {
            console.log(i);
          }
        }*/
        // 4.优化上面代码：先将i赋值给currentIndex，然后判断this.currentIndex !== i为false就终止代码，等i切换时才会判断一次。以此优化代码不会频繁比较了
        /*let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length - 1 && positionY > this.themeTopYs[i]))) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            // 导航栏的currentIndex = this.currentIndex时滚动到相应位置对用标题会自动切换
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }*/
        // 5.继续优化判断，themeTopYs[]中增加一个Number.MAX_VALUE元素。就可以简化判断
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        console.log(product);
        // 2.将商品加入到购物车里面
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
    height: calc(100% - 44px - 58px);
    /*overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;*/
  }
</style>
