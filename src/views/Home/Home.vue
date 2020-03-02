<!-- 首页 -->
<template>
<div class='home'>
    <navbar class='nav-bar'><div slot="center">购物街</div></navbar>
    <tapcontrol @Change="changeGoods"  :title="['流行','热销','新款']"></tapcontrol >
    <backtop 
    class="back-top"
    @click.native="getBackTop(0,0)"
    v-show="isArrival"
    ></backtop>
    <scroll id="content"
    ref="scroll"
    @scroll='scrolltop'
    @pullingUp='onpullingUp'
    :probe-type='3'
    :pull-up-load="true"
    >
        <div>  
            <goodslist class="goodslist" :Gooditem="goods[currentType].list" ></goodslist>
        </div>
       
    </scroll>  
</div>
</template>

<script>
import navbar from '@/components/common/nav/navbar'
import tapcontrol from '@/components/content/tapcontrol/tapcontrol'
import goodslist from './homeChild/goodslist'
import scroll from '@/components/common/scroll/scroll'
import backtop from '@/components/content/backtop/backtop'


import {getHomeMultidata,getHomeData} from '../../network/home'

import { Search } from 'mint-ui';


export default {
//import引入的组件需要注入到对象中才能使用
components: {
    navbar,
    tapcontrol,
    goodslist,
    scroll,
    backtop
   
    
},
data() {
return {
    goods:{
        pop:{page:0,list:[]},
        sell:{page:0,list:[]},
        new:{page:0,list:[]},
    },
    currentType:"pop",
    isArrival: false,
    ScrollY:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
        console.log(res)
         
    })
    },
        //请求主页商品信息
    getHomeData(type) {
        const Page =  this.goods[type].page + 1
        getHomeData(type,Page).then(res=>{
        console.log(res.data.list)
        let newgoods = res.data.list
        this.goods[type].list.push(...newgoods)
        this.goods[type].page += 1 
        console.log(this.goods[type].page)

        //完成上拉
        this.$refs.scroll.funlishPillUp()
    })
    },
    changeGoods(i) {
        switch (i) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "sell"
            break
          case 2:
            this.currentType = "new"
            break
        }
    },
        //按回顶按钮返回顶部
    getBackTop(x,y,time=500) {   
        this.$refs.scroll.getbacktop(x,y,time)     
    },
        //拉到1000返顶按钮消失
    scrolltop(pos) {
        this.isArrival = (-pos.y>1000)              
    },
        //上拉加载商品
    onpullingUp(currentType) {
        this.getHomeData(this.currentType)
        
    },
        //得到销毁前上拉商品的高度
        getScrollY() {
            return this.ScrollY= this.$refs.scroll.Scroll.y
        },
        //维持商品原来的高度
        backScrollY(y) {
            this.$children[3].Scroll.scrollTo(0,y)
        },
     debounce(fnc,delay) {
         let timer = null
         return function (...args) { 
             if (timer)  clearTimeout(timer)
            timer = setTimeout(() =>{
             fnc.apply(this,args)
             
                      
         },delay)
           
          }
         
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {   
    this.getHomeData('sell')
    this.getHomeData('new')
    this.getHomeData('pop')
    
    
    
},  
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    const Refresh = this.debounce(this.$refs.scroll.refresh,20)  
    this.$bus.$on('imgrefresh', () => { 
           //this.$refs.scroll.refresh()
           Refresh()     
     })
       
    
},
activated() {
    this.backScrollY(this.ScrollY)
    
    this.$refs.scroll.refresh()
      console.log('刷新');
      
    
    
    
}, //如果页面有keep-alive缓存功能，这个函数会触发
 deactivated() {
     this.getScrollY()
     
     
 }//如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.home {
    height: 100vh;
}
.nav-bar {
    background-color: pink;
    font-weight: 700;
    color: #fff;
    font-size: 16px;
}

 .goodslist {       
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
#content {
    height: calc(100% - 137px);
    overflow: hidden;    
}
.back-top {
    position: absolute;
    right: 5px;
    bottom: 49px;
    z-index: 9;
}
</style>