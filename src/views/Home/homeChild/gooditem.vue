<!--  -->
<template>
<div class='goods'
@click="itemClick"
>
    <img  :src="goodsitem.image||goodsitem.show.img" alt="" @load="showimg">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">¥{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {

};
},
props:{
    goodsitem:{
        type:Object,
        default (){
            return {}
        }
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  itemClick() {
        
        this.$router.push('/detail/'+ this.goodsitem.iid)
        
  },
  showimg() {
   this.$bus.$emit('imgrefresh')  
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
    .goods {
    padding-bottom: 44px;
    position: relative;
    margin: 0 3px;
    width: 48% ;
    
    
  }
  .goods img {
    width: 100%;
    
    
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    
  }
</style>