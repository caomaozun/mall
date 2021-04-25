<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import {getHomeMultidata} from '@/network/home'

  export default {
    name: "Home",
    components: {
      NavBar
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
    /*CSS2的BFC中position: fixed*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
