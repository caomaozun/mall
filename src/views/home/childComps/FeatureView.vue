<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="@/assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView"
}
</script>

<style scoped>
  .feature img {
    /*width:auto；会将元素撑开至整个父元素width，但是会减去子节点自己的margin，padding或者border的大小。*/
    /*width:100%；会强制将元素变成和父元素一样的宽，并且添加额外的空间到这个元素的width上*/
    width: 100%;
  }
</style>
