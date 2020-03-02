import axiox from './axios'

export  function getdetail(iid) {
      return axiox({
        url: 'detail',
        params: {
        iid
      }
    })
}
export function getrecommend() {
      return axiox({
        url: 'recommend',      
      })
  }

export class getiteminfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.iid = itemInfo.iid
    this.lowPrice = itemInfo.lowPrice
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  } 
}


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}


