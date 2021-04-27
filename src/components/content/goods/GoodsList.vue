<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goodsList" :goods-list-item="item" class="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    /*wrap:根据宽度决定一行显示多少个*/
    flex-wrap: wrap;
    /*一行两个图片均等分*/
    justify-content: space-around;
    /*图片均等分后，微调，使图片位置看起来舒服*/
    padding: 5px;
  }
  .goods-list .item {
    width: 48%;
  }
</style>
