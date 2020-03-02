const actions = {
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
    GetLoginid({state,commit},ID) {
        if (!state.LoginId) {
            state.LoginId = ID
        }
        
    }
    
}

export default actions