const mutations = {
    //同种商品数量增加
    addcount(state,info) {
        info.count++
    },
    //添加商品
    addinfo(state,info) {
        state.cartgoods.push(info)
    },
    //添加用户信息
    ReceiveUser(state,user){
        state.User =user
        console.log(state.User);
        
}
    }
        

export default mutations