<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabControlClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="homeScroll"
            :pull-up-load=true
            @pullingUp="loadMore">
      <home-swiper :banner="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommend="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabControlClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed: isTabFixed}"/>
      <!--<goods-list :goods="goods[currentType].list"/>-->
      <goods-list :goods-list="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from '@/network/home'
  import {debounce} from '@/common/utils'
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        // result: null,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins: [itemListenerMixin],
    destroyed() {
      // console.log('测试Home是否被销毁');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 离开组件时保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 离开组件时取消全局事件的监听，这样会取消所有组件对此事件的监听
      // this.$bus.$off('itemImgLoad')
      // 离开组件时取消本组件对全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata(),
      // 2.请求goods数据
      // 2.1 creat()里面最好只写主要逻辑，将请求goods数据getHomeGoods()进行一次封装提取到下面methods里面
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      /*// 监听GoodsListItem中发射的事件，写在这里会出现找不到scroll的问题
      this.$bus.$on('itemImgLoad', () => {
        this.$refs.scroll.refresh()
      })*/
    },
    mounted() {
      // 监听GoodsListItem中发射的事件，为了不出现找不到scroll的问题必须写在mounted生命周期函数中。
      /*const newRefresh = debounce(this.$refs.scroll.refresh, 500)
      this.itemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener)*/
      // 获取tabControl的offsetTop，所有组件中都有一个属性 $el 用于获取组件的元素
      // 但是在mounted生命周期函数中会存在TabControl上面的图片未加载完成时算出来offsetTop，这样会计算错误
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
      // 事件监听的相关方法
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTopClick() {
        this.$refs.scroll.scrollToTop(0, 0, 500)
      },
      homeScroll(position) {
        // 判断tabTop是否显示
        this.isShow = (-position.y) > 1000
        // 决定TabControl是否吸顶（动态样式是否为position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      // 网络请求的相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        // 2.2 type通过参数传入，page通过传入的type来定义
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          // 2.3 a.push(...b[])：是将b数组遍历后添加到a数组，相当于下面的for循环
          /*for(let n of res.data.list) {
            this.goods[type].list.push(n)
          }*/
          this.goods[type].list.push(...res.data.list)
          // 2.4 push()完数据后页码相应+1
          this.goods[type].page += 1

          // 完成下拉加载更多，以便于继续下一次下拉
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*
    height:100vh == height:100%
    但是当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，
    但是设置height:100vh，该元素会被撑开屏幕高度一致。
    */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    /*base.css设置的变量*/
    background-color: var(--color-tint);
    /*文字颜色*/
    color: #fff;
    /*CSS2的BFC中position: fixed 元素的位置相对于浏览器窗口是固定位置,即使窗口是滚动的它也不会移动：*/
    /*
    浏览器原生滚动时为了不让导航随着滚动，需要设置fixed，现在使用better-scroll后就不需要了
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    !*z-index 属性指定一个元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面*!
    z-index: 9;*/
  }
  /*
    这个样式在应用better-stroll后就不起作用了
    .tab-control {
    !*position: sticky移动端可以使用，适配IE时严禁使用*!
    position: sticky;
    top: 44px;
    !*不设置的话，goods上划会覆盖此组件*!
    z-index: 9;
  }*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {
    height: calc(100vh - 93px);
  }*/
  /*
  动态绑定属性这个方法不行，这个就没用了
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }*/
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
