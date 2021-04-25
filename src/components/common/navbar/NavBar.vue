<template>
  <div class="nav-bar">
    <!-- div把slot包起来可以设置样式 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    /*css3flex弹性布局*/
    display: flex;
    /*height: 44px;*/
    line-height: 44px;
    /*text-align文本对齐*/
    text-align: center;
    /*css3边框阴影*/
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    /*flex-grow: number*/
    flex: 1;
  }
</style>
