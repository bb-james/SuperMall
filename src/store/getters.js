const getters = {
    //选中商品数量
    cartlength(state) {
        return state.cartgoods.length
    },
    //选中商品的数据
    cartstate(state) {
        return state.cartgoods
    },
    //选中商品总价格
    totalPrice(state) {
        const cartList= state.cartgoods
        return cartList.filter(item => item.checked)
                       .reduce((prevalue, cur) =>prevalue + cur.lowPrice * cur.count,0)
                       .toFixed(2)

                
    },
    isSelectAll(state) {
        return state.cartgoods.find(item =>item.checked===false) === undefined
    }
}

export default getters