<template>
    <div>
      <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
      isChecked: {
		    type: Boolean,
        default: false
      }
    }
	}
</script>

<style scoped>
  .check-button {
    border: 1px solid #aaa;
    border-radius: 50%;
  }
  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
