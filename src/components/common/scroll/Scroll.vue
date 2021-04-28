<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听滚动
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('homeScroll', position)
      })
    },
    methods: {
      scrollToTop(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        // console.log('-----')
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
