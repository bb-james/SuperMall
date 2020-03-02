<!--  -->
<template>
<div class='wrapper' ref="wrapper">
    <div>
        <slot></slot>
    </div>    
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
    Scroll : {}
};
},
props: {
    probeType: {
       type:Number,        
    },
     pullUpLoad: {
         type:Boolean,
         default: false
     }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
   
},
//方法集合
methods: {
    __initscroll() {
          //实例BScroll
          if (!this.$refs.wrapper) return
    this.Scroll = new BScroll(this.$refs.wrapper, {
         click: true,
         probeType: this.probeType,
         pullUpLoad:this.pullUpLoad
         
    })
        //监控滚动距离
    this.Scroll.on('scroll',(pos) =>{               
        this.$emit('scroll',pos)
    })
        //上拉加载
    this.Scroll.on('pullingUp', () => {
          console.log('上拉加载');
          this.$emit('pullingUp')
        })
    },
    //返回顶端
    getbacktop(x,y,time=500) {
         this.Scroll&&this.Scroll.scrollTo(x,y,time)       
    },
    //完成上拉动作
    funlishPillUp() {
        this.Scroll&&this.Scroll.finishPullUp()                
    },
    refresh() {
        console.log("---");
        this.Scroll&&this.Scroll.refresh()
         
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    
        this.__initscroll()
    
      
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