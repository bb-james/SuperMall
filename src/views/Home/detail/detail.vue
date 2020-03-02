<!--  -->
<template>
<div id='detail'>  
    <detailnav 
    ref="nav"
    @getindex='getindex'
    ></detailnav>
    <scroll
    ref="scroll"
    
    @scroll = 'scroll'
    class="detail-scroll"
    :probeType="3"
    >       <div class ='info' ref="info">
                <detailswiper :swiperimg='topimgs'></detailswiper>  
                <detailinfo :goods='detailinfo '></detailinfo> 
                <detailshopinfo :shop="shopinfo"></detailshopinfo>
            </div>
            <div ref="param">
                <detail-param-info :paramInfo="paramInfo"></detail-param-info>
            </div>
            <div ref="comment">
                <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
            </div>
            <div ref="recommend">
                <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>
            </div>
                    
    </scroll>
      <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar >   
     <div class="backtop" ref="backtop" @click="getBackTop(0,0)" v-if="isArrival">
        <backtop></backtop>    
      </div>   
</div>


</template>

<script>
import detailnav from './detailchild/detailnav'
import detailswiper from './detailchild/detailswiper'
import detailinfo from './detailchild/detailinfo'
import detailshopinfo from './detailchild/detailshopinfo'
import detailParamInfo from './detailchild/detailParamInfo'
import detailCommentInfo from './detailchild/detailCommentInfo'
import detailRecommendInfo from './detailchild/detailRecommendInfo'
import detailBottomBar from './detailchild/detailBottomBar'

import backtop from '@/components/content/backtop/backtop'

import {getdetail,getrecommend,getiteminfo,Shop,GoodsParam} from '../../../network/detaul'

import scroll from '../../../components/common/scroll/scroll'

export default {
//import引入的组件需要注入到对象中才能使用
name:'detail',
components: {
   detailnav,
   detailswiper,
   detailinfo,
   detailshopinfo,
   detailParamInfo,
   detailCommentInfo,
   detailRecommendInfo,
   detailBottomBar,
   scroll,
   backtop
  
},
data() {
return {
    
    id:null,
    //轮播图变量
    topimgs:[],
    //商品信息变量
    detailinfo:{},
    //商店信息变量
    shopinfo:{},
    paramInfo:{},
    commentInfo: {},
    recommendList: [],
    isArrival: false,
    scrollY: 0,
    top:[],
    Index:0,

 


};
},
//监听属性 类似于data概念
computed: {

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {  
    getindex(index) {
        this.tapindex = index        
        this.$refs.scroll.Scroll.scrollTo(0,-this.top[index],700)
        

    },
    scroll(pos) {            
        this.scrollY = Math.abs(pos.y)
        this.Index = this.top.findIndex((item,index) =>{
       
            return  this.scrollY >= item && this.scrollY < this.top[index + 1] || item > this.top[2]
        })
        this.$refs.nav.currentIndex = this.Index
        //拉到1000返顶按钮消失   
        this.isArrival = (-pos.y>1000)              
             
    },
      inittop() {
          setTimeout(() =>{
               let {top} = this
        top.push(this.$refs.info.offsetTop-44)
        top.push(this.$refs.param.offsetTop-44)
        top.push(this.$refs.comment.offsetTop-44)
        top.push(this.$refs.recommend.offsetTop-44)     
          },1000)
       
        
    },
    getBackTop(x,y,time=500) {   
        this.$refs.scroll.getbacktop(x,y,time)     
    },
    addToCart() {
        let produce = {}
        produce.title= this.detailinfo.title
        produce.desc= this.detailinfo.desc
        produce.img=this.topimgs[0]
        produce.iid = this.detailinfo.iid
        produce.lowPrice = this.detailinfo.lowPrice

        console.log(this.$store);
        this.$store.dispatch('addcart',produce)
        
        
        
        
    }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {    
        this.id = this.$route.params.id
    
    getdetail(this.id).then(res =>{
        const data = res.result
        //获取商品轮播图照片
        this.topimgs = data.itemInfo.topImages
        //获取商品信息
        this.detailinfo = new getiteminfo(data.itemInfo, data.columns, data.shopInfo.services)      
        //获取商店信息    
        this.shopinfo = new Shop(data.shopInfo)
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)  
        //保存评论信息
        if (data.rate.list) {
         this.commentInfo = data.rate.list[0];
        }
            console.log(res);
            
    })

    getrecommend().then(res =>{
        this.recommendList = res.data.list
        console.log(res);
        
    })
    
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     this.inittop()
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

#detail {    
    height: 100vh;
    position: relative;
    z-index: 12;
    background-color: #fff;
    }
.detail-scroll {
    height: calc(100% - 44px);
    overflow: hidden;       
}
.backtop {
    position: absolute;
    right: 5px;
    bottom: 49px;
    z-index: 9;
}
</style>