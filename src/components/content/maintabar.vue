<!--  -->
<template>
<div class=''>
    <tabar>
    <tabaritem path="/home">
        <img slot="slot-img" src="../../assets/img/tabbar/home.svg" alt="">
        <img slot="slot-active-img" src="../../assets/img/tabbar/home_active.svg" alt="">
    <span slot='slot-text'>首页
        </span> </tabaritem> 
    <tabaritem path="about">
        <img slot="slot-img" src="../../assets/img/tabbar/category.svg" alt="">
        <img slot="slot-active-img" src="../../assets/img/tabbar/category_active.svg" alt="">
        <span slot='slot-text'>分类</span>
        </tabaritem> 
    <tabaritem path="/cart">
        <img slot="slot-img" src="../../assets/img/tabbar/cart.svg" alt="">
        <img slot="slot-active-img" src="../../assets/img/tabbar/cart_active.svg" alt="">
    <span slot='slot-text'>购物车</span></tabaritem> 
    <tabaritem path="profile">
        <img slot="slot-img" src="../../assets/img/tabbar/profile.svg" alt="">
        <img slot="slot-active-img" src="../../assets/img/tabbar/profile_active.svg" alt="">
        <span slot='slot-text'>档案</span>
        </tabaritem>
    </tabar>

</div>
</template>

<script>

import tabar from '../common/TaBar/tabar'
import tabaritem from '../common/TaBar/tabaritem'
export default {
//import引入的组件需要注入到对象中才能使用

components: {
    tabar,
    tabaritem
},
data() {
return {

};
},
//监听属性 类似于data概念
computed: {},
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
<style lang='scss' scoped>

</style>