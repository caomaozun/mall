<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
      <home-swiper :banner="banners"/>
      <recommend-view :recommend="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabControlClick="tabClick"/>
      <!--<goods-list :goods="goods[currentType].list"/>-->
      <goods-list :goods-list="showGoods"/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from '@/network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
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
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata(),
      // 2.请求goods数据
      // 2.1 creat()里面最好只写主要逻辑，将请求goods数据getHomeGoods()进行一次封装提取到下面methods里面
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*
    height:100vh == height:100%
    但是当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，
    但是设置height:100vh，该元素会被撑开屏幕高度一致。
    */
    height: 100vh;
    /*position: relative;*/
  }
  .home-nav {
    /*base.css设置的变量*/
    background-color: var(--color-tint);
    /*文字颜色*/
    color: #fff;
    /*CSS2的BFC中position: fixed 元素的位置相对于浏览器窗口是固定位置,即使窗口是滚动的它也不会移动：*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*z-index 属性指定一个元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面*/
    z-index: 9;
  }
  .tab-control {
    /*position: sticky移动端可以使用，适配IE时严禁使用*/
    position: sticky;
    top: 44px;
    /*不设置的话，goods上划会覆盖此组件*/
    z-index: 9;
  }
  /*.content {*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .content {
    height: calc(100vh - 93px);
  }
</style>
