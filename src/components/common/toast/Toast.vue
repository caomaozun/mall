<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
	export default {
		name: "Toast",
    data() {
			return {
				isShow: false,
        message: ''
      }
    },
    methods: {
		  show(message, duration=1000) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    /*left top transform共同作用达到弹窗居中效果*/
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /*背景色透明度0.8*/
    background-color: rgba(0,0,0,.8);
    /*文字和背景间的padding*/
    padding: 10px;
    /*border-radius设置元素的外边框圆角*/
    border-radius: 5px;
    /*字体颜色*/
    color:#fff;
    /*避免被覆盖*/
    z-index: 99;
  }
</style>
