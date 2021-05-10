import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  /*addCart(state, payload) {
    // state.cartList.push(payload) 这样写每次添加都是一个对象，但是实际应该是只增加对象的数量
    /!*
    for循环添加对象：
    开始购物车为空，
    设置oldProduct=null，for循环中if不成立循环中断，走下面else分支将第一个商品添加进来并且数量加1。
    设置oldProduct=null接着添加商品，如果添加的还是上一次的商品，则for循环中if成立，oldProduct = item，oldProduct!=null了，下面if分支将商品数量加1
    设置oldProduct=null接着添加商品，如果添加的不是原来的商品，for循环中if不成立循环中断，走下面else分支将新商品添加到cartList[]中
    以此类推···
    let oldProduct = null
    for (let item of state.cartList) {
      if(item.iid === payload.iid) {
        oldProduct = item
      }
    }
    // 判断oldProduct
    if(oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }*!/

    /!*
    indexOf方法添加对象：
    indexOf方法：返回数组中指定值最后一次出现的索引，如果不存在则返回-1
    第一步indexOf肯定返回值-1，走下面else分支，将第一个商品添加进去
    第二次添加商品，如果是添加的不同的，还是和第一步一样走else分支将商品添加进去
    第三次添加商品，如果添加的和第二次相同则返回index=1，走if分支let oldProduct = state.cartList[1]，第二次添加的商品数量+=1为2
    以此类推···
    let index = state.cartList.indexOf(payload)
    // 判断oldProduct
    if(index !== -1) {
      let oldProduct = state.cartList[index]
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }*!/

    /!*数组的find()来添加对象：
    数组的find()方法返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined。find()对于空数组函数是不会执行的。
    开始item.iid !=== payload.iid返回undefined，走else分支添加第一个对象，
    以后添加对象先比较新的item.iid === payload.iid结果，如果相同则oldProduct = 添加的对象，走if分支，对象数量+1。不同则走else分支添加一个新对象*!/

    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }
  }*/
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
