<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banners"/>
    <recommend-view :recommend="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata} from '@/network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        // result: null,
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
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
    position: sticky;
    top: 44px;
  }
</style>
