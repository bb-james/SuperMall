<!--  -->
<template>
<div class='tabar'>    
    <slot></slot>
</div>
</template>

<script>
import tabaritem from './tabaritem'
export default {

components: {
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

}
</script>
<style lang='scss' scoped>

.tabar {
    height: 49px;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    z-index: 10;
    
}
</style>