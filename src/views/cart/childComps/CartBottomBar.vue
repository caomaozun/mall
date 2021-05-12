<template>
  <div class="bottom-bar">
    <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkedLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 三种方式：for循环、filter和find。for循环和filter是把数组都遍历一遍，find是找到就停止遍历。相对来说find效率高。
        // 不管选哪种方式都要先判断购物车有没有对象，默认没有对象时返回false。不然会出现购物车为空时全选处于选中状态的BUG
        if (this.cartList.length === 0) {
          return false
        }
        // 1.filter方式
        // return !(this.cartList.filter(item => !item.checked).length)
        // 2.find方式
        // return this.cartList.find(item => item.checked === false) === undefined;
        return !this.cartList.find(item => !item.checked)
        // 3.普通for循环：mutations中item.checked默认为true，遍历商品对象如果
        /*let isChecked = false
        for (let item of this.cartList) {
          if (!item.checked) {
            isChecked = false
            return isChecked
          }
        }
        return isChecked = true*/
        // 上面for循环代码优化
        /*for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true*/
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          // forEach()方法用于调用数组的每个元素并将元素传递给回调函数。注意:forEach()对于空数组是不会执行回调函数的。
          // 如果this.isSelectAll=true则表示商品都被选中了，就将每一个item.checked=false
          this.cartList.forEach(item => item.checked = false);
        } else {
          // 否则（有一个或所有都未选中），就将每一个item.checked=true
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if(this.checkedLength === 0) {
          this.$toast.show('请选择要购买的商品')
        }
        if(this.cartList.length === 0) {
          this.$toast.show('购物车为空')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-bar .check-button {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
