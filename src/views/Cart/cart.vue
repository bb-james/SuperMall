<!-- 我的 -->
<template>
<div id='cart'>
    <div >
        <navbar class="nav"><div slot="center">购物车({{cartlength}})</div></navbar>   
        <cart-list class="cart-list" :cartList='cartstate'></cart-list>
        <bottom-bar></bottom-bar>
    </div>
        
</div>
</template>

<script>
import navbar from '../../components/common/nav/navbar'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'

import {mapGetters} from 'vuex'

export default {
 name:'cart',   
//import引入的组件需要注入到对象中才能使用

components: {
    navbar,
    CartList,
    BottomBar
},
data() {   
return {

};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['cartlength','cartstate'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
    #cart {
        height: 100vh;
    }
    .nav {
        background-color: pink;
        font-size: 16px;
        font-weight: 700;
    }
     .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>