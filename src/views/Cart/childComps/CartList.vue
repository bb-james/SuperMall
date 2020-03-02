<template>
   <scroll class="cart-scroll" ref="scroll">
    <div id="content">     
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>

 
</template>

<script>
  import scroll from '../../../components/common/scroll/scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  scroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      console.log('刷新');
      
    },
  }
  
</script>

<style scoped>
  
  #content {
    height: calc(100vh - 44px - 49px - 44px);
    overflow: hidden;
  }
</style>
