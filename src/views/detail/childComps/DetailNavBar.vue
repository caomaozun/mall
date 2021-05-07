<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item, index) in titles"
             class="titles-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
  }
  .titles-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    position: relative;
    top: 5px
  }
</style>
