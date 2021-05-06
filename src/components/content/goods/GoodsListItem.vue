<template>
  <div class="goods-list-item" @click="itemClick">
<!--    <img :src="goodsListItem.show.img" alt="" @load="imgLoad">-->
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-list-item-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsListItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsListItem.image || this.goodsListItem.show.img
        // 注意：当数值参与逻辑或（ || ）运算时，结果为true会返回第一个为真的值，结果为false会返回第二个为假的值
        // return this.goodsListItem.show.img || this.goodsListItem.image
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('itemImgLoad')
        /*if(this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeItemImgLoad')
        } else if(this.$route.path.indexOf('/detail')) {
          this.$bus.$emit('detailItemImgLoad')
        }*/
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsListItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    /*40px用来放title/price/cfav*/
    padding-bottom: 40px;
    /*父级标签relative，子级标签position来做到无论浏览器如何改变，都是相对浏览器的定位*/
    position: relative;
  }
  .goods-list-item img {
    width: 100%;
    /*border-radius为元素添加圆角边框*/
    border-radius: 5px;
  }
  .goods-list-item-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-list-item-info p {
    /*超出文本呈现···*/
    overflow: hidden;
    text-overflow: ellipsis;
    /*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止*/
    white-space: nowrap;
    /*p和span隔开3px*/
    margin-bottom: 3px;
  }
  .goods-list-item-info .price {
    /*price颜色*/
    color: var(--color-high-text);
    /*price和cfav间隔20px*/
    margin-right: 20px;
  }
  .goods-list-item-info .collect {
    /*相对定位*/
    position: relative;
  }
  .goods-list-item-info .collect::before {
    /*::before收藏图标通过伪元素导入图片collect.svg*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
