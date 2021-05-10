import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart(context, payload) {
    // 1.查找数组中是否有新增加的商品对象
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    }else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
