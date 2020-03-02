<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view >
      <gooditem v-for="(item, index) in recommendList" :key="index" :goodsitem="item" class="fl"></gooditem>
    </grid-view>
  </div>
</template>

<script>
  import GridView from '../../../../components/common/gridView/GridView'
  import gooditem from '../../homeChild/gooditem'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  GridView,
      gooditem
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
  
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
