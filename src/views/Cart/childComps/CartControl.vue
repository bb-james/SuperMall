<!--  -->
<template>
  <div class="cartcontrol">
    <transition name="move">
        <div class="iconfont icon-jiajian-1" v-if="info.count>1" @click.stop="updateFoodCount(false)"></div>                   
    </transition>  
    <div class="cart-count" v-if="info.count>1">{{info.count}}</div>    
    <div class="iconfont icon-jiajian-" @click.stop="updateFoodCount(true)"></div>    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: {
    info: Object
},
data() {
return {

};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters(['cartstate'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    updateFoodCount(option) {
      if (option) this.info.count+=1
      else if (!option) this.info.count--     
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    console.log(this.info);
    
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
<style scoped>
    .cartcontrol {
        float: right;
    }
     .icon-jiajian-, 
    .icon-jiajian-1,
    .cart-count {
        display: inline-block;
        font-size: 18px;
    }
    .cart-count {
        padding: 0 10px;
        color: grey;
    }
    .icon-jiajian-, 
    .icon-jiajian-1 {
        color: deeppink;
    }
    .move-enter-active,
    .move-leave-active {
         transition: all .3s cubic-bezier(0, 0, 1, 1);
    }
    .move-enter, 
    .move-leave-to {
        opacity: 0;
        transform:  rotate(180deg);
    }
</style>