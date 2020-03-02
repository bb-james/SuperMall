<!--  -->
<template>
<div class='tabaritem'  @click="getactive" >   
    <div class="item-icon" v-if="!isActive"><slot name="slot-img"></slot></div>
    <div class="item-active-icon" v-else><slot name="slot-active-img"></slot></div>
    <div :style="activeStyle"><slot name="slot-text"></slot></div>
    
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    
},
data() {
return {
    
};
},
props: {
    	path: {
				type: String,
                required: true
        }
    
},
//监听属性 类似于data概念
computed: {
    	isActive() {
				return this.$route.path.indexOf(this.path) !== -1
      },
        activeStyle() {
				return this.isActive ? {'color': 'red'} : {}
      }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getactive(){
       this.$router.push(this.path)
     
    }
}
}
</script>
<style >
    .tabaritem {
        text-align: center;   
        flex: 1;
        
        z-index: 10;
        
        
    }
    
     .item-icon img, .item-active-icon img {
        width: 24px;
        height: 24px;
        margin-top: 5px;
        vertical-align: middle;
  }
</style>