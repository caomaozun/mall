import Toast from './Toast'

const plugin = {}

plugin.install = function (Vue) {
  // 创建组件构造器
	const toastConstructor = Vue.extend(Toast)
  // 根据构造器new出来一个对象
  const toast = new toastConstructor()
  // 将组价对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // toast.$el对应的就是这个div
  // 将toast的$el添加到body中
  document.body.appendChild(toast.$el)
  // 将Toast添加到Vue原型，其他组件就可以直接拿到Toast组件，用this.$toast.show()调用Toast中的show()
  Vue.prototype.$toast = toast
}

export default plugin
