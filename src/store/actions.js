

const actions = {    
    ///购物车添加商品
    addcart({state,commit},info) {
       let oldinfo = state.cartgoods.find(item => item.iid === info.iid) 
       //商品存在
       if (oldinfo) {
          commit('addcount',oldinfo) 
       }
       //商品不存在
       else {
           info.count = 1
           //商品在购物车默认选中
           info.checked = true
           commit('addinfo',info)
       }
       console.log(state.cartgoods);
       
    },
    //获取用户信息(用户名，登陆ID)
    GetLoginUser({state,commit},result) {
       commit('ReceiveUser',result)
        // if (!state.user) {
        //     state.user = result
        //     console.log( state.user);
            
        // }
        
    }
    
}

export default actions