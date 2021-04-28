<template>
  <div class="back-top">
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    /*position: fixed生成绝对定位的元素，相对于浏览器窗口进行定位。*/
    position: fixed;
    right: 5px;
    bottom: 49px;
  }
  .back-top img {
    height: 50px;
    width: 50px;
  }
</style>
