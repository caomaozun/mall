<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /*flex-shrink指定了 flex 元素的收缩规则*/
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
