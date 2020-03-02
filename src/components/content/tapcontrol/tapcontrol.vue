<!--  -->
<template>
<div class='tapcontrol'>
    <div 
    class="tap-item"     
    v-for="(item, index) in title" :key="item" 
    @click="getTapitem(index),ChangeTapcontrol(index)"
    >
    <span :class="{active:(Index==index)}">{{item}}</span>
    </div>
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
    Index: 0
};
},
props:{
    title:{
        type:Array,
        default(){
            return []
        }
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getTapitem(index) {
        this.Index = index
    },
    ChangeTapcontrol(index) {
        let i = index
        
        this.$emit('Change',i)
    }
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
    .tapcontrol {
        height: 44px;
        width: 100%;
        background-color: yellow;
        display: flex;
    }
    .tap-item {
        flex: 1;
        font-size: 16px;
        text-align: center;
        line-height: 44px;
    }
    .active {
        padding: 0 5px 5px 5px;
        border-bottom: 4px solid red;
    }

</style>