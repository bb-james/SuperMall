<!--  -->
<template>
<div class='App'>
    <keep-alive exclude="detail">
        <router-view></router-view>
    </keep-alive>    
    <maintabar class="" ></maintabar>
    
</div>
</template>

<script>

import maintabar from './components/content/maintabar'

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    maintabar
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
   
}
}
</script>
<style >
@import "./assets/css/base.css";
</style>